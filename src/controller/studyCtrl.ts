import { RequestHandler } from 'express';
import * as request  from 'request';
import { conn } from '../util/connector';
import { Crud } from '../util/crud';

export class StudyCtrl{
	public studyTbl:any;
	public placeTbl:any;

	constructor(){
		this.studyTbl = new Crud('study');
		this.placeTbl = new Crud('s_place');
	}
	public make: RequestHandler = (req, res) => {
		this.studyTbl.insert(req.body.study).go((data)=>{
			if(data.msg == "done"){
				let getAdmin = this.studyTbl.selectList({admin: req.session.userData.idx}).querychk();
				getAdmin += " order by idx desc";
				conn.query(getAdmin, (err, data) => {
					if(err){
						res.json({msg: 'error'})
					}
					let result = true;
					// data[0]
					for(let item of req.body.place){
						item.study_idx = data[0].idx;
						this.placeTbl.insert(item).go((data)=>{
							result = (data.msg != "done") ? false : true;
						})
					}
					result ? res.json({msg: "done"}) : res.json({msg:"error"});
				});
			}
		});
		
	}
	public list: RequestHandler = (req, res) => {
		this.studyTbl.selectList(req.body).go((data)=>{
			res.json(data);
		})
	}
	public search: RequestHandler = (req, res) => {
		this.studyTbl.selectList(req.body).go((data)=>{
			res.json(data);
		})
	}
	public adminList: RequestHandler = (req, res) => {
		this.studyTbl.selectList({admin: req.session.userData.idx}).go((data)=>{
			res.json(data);
		})
	}
	public map: RequestHandler = (req, res) => {
		let client_id = '4YTa1awkt2vPfKrRToJ0';
		let client_secret = 'bh3FSTUtw3';
		let place = encodeURI('석남3동');
		let api_url = 'https://openapi.naver.com/v1/map/geocode?display=30&query=' + place;
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
	public place_search: RequestHandler = (req, res) => {
		let client_id = '4YTa1awkt2vPfKrRToJ0';
		let client_secret = 'bh3FSTUtw3';
		let place = encodeURI(req.params.input);
		let api_url = 'https://openapi.naver.com/v1/search/local.json?query=' + place;
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

	public doPromise(input:StudyCtrl){
		return new Promise(function(resolve, reject){
			resolve(input);
		});
	}
}

export const studyCtrl = new StudyCtrl();
