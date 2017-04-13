import { RequestHandler } from 'express';
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
}

export const studyCtrl = new StudyCtrl();
