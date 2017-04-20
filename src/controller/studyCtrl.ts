import { RequestHandler } from 'express';
import * as request  from 'request';
import { conn } from '../util/connector';
import { Crud } from '../util/crud';

export class StudyCtrl{
    public studytbl:any;

    constructor(){
        this.studytbl = new Crud('study');
    }
    public make: RequestHandler = (req, res) => {
        this.studytbl.insert(req.body).go((data)=>{
            console.log(data);
            res.json(data);
        });
    }
    public list: RequestHandler = (req, res) => {
        this.studytbl.selectList(req.body).go((data)=>{
            res.json(data);
        })
    }
    public search: RequestHandler = (req, res) => {
        this.studytbl.selectList(req.body).go((data)=>{
            res.json(data);
        })
    }
    public adminList: RequestHandler = (req, res) => {
        this.studytbl.selectList({admin: req.session.userData.idx}).go((data)=>{
            res.json(data);
        })
    }
    public map: RequestHandler = (req, res) => {
        let client_id = '4YTa1awkt2vPfKrRToJ0';
        let client_secret = 'bh3FSTUtw3';
        let place = encodeURI('석남3동');
        let api_url = 'https://openapi.naver.com/v1/map/geocode?query=' + place;
        let options = {
            url: api_url,
            headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
        };

        request.get(options, function(error, response ,body){
            if(!error && response.statusCode == 200){
                res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
                res.end(body);
            }else{
                res.status(response.statusCode).end();
                console.log('error = '+ response.statusCode);
            }
        });
    }
}

export const studyCtrl = new StudyCtrl();
