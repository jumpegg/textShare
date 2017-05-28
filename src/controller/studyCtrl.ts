import { RequestHandler } from 'express';
import * as request  from 'request';
import { conn } from '../util/connector';
import { Crud } from '../util/crud';

export class StudyCtrl{
	public studyTbl:any;
	public placeTbl:any;
	public memberTbl:any;

	constructor(){
		this.studyTbl = new Crud('study');
		this.placeTbl = new Crud('s_place');
		this.memberTbl = new Crud('s_member');
	}
	public studyEnter: RequestHandler = (req, res) => {
		if(req.session.login){
			req.session.studyIdx = req.params.idx;
			res.send(true);
		}else{
			res.send(false);
		}
	}
	public studyExit: RequestHandler = (req, res) => {

	}
	public isUserStudy: RequestHandler = (req, res) => {
		if(req.session.studyIdx && req.session.userData.idx){
			res.json(req.session);
		}else{
			res.json(false);
		}
	}
	public studySet: RequestHandler = (req, res) => {
		if(req.session.studyIdx){
			this.studyTbl.selectOne({idx: req.session.studyIdx}).go((data) => {
				res.json(data);
			})
		}
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
					for(let item of req.body.place){
						item.study_idx = data[0].idx;
						this.placeTbl.insert(item).go((data)=>{
							result = (data.msg != "done") ? false : true;
						})
					}
					if(result){
						let temp:any = new Object();
						temp.study_idx = data[0].idx;
						temp.user_idx = req.session.userData.idx;
						temp.permission = 1;
						this.memberTbl.insert(temp).go((data)=>{
							(data.msg == 'done') ? res.json({msg: 'done'}) : res.json({msg:'error1111'});
						})
					}else{
						res.json({msg:"error2222"});
					}
				});
			}
		});
	}
	public modify: RequestHandler = (req, res) => {
		// console.log(this.studyTbl.update(req.body.study).querychk());
		this.studyTbl.update(req.body.study).go((data) => {
			if(data.msg == 'done'){
				let result = true;
				for(let placeItem of req.body.place){
					let getAdmin = req.body.study.idx;
					if(!placeItem.idx){
						placeItem.study_idx = req.body.study.idx;
						this.placeTbl.insert(placeItem).go((data) => {
							result = (data.msg != 'done') ? false : true;
						})
					}else{
						this.placeTbl.update(placeItem).go((data) => {
							result = (data.msg != 'done') ? false : true;
						})
					}
				}
				result ? res.json({msg: "done"}) : res.json({msg:"error"});
			}
			// res.json(data);
		})
	}
	public list: RequestHandler = (req, res) => {
		this.studyTbl
		.selectList(req.body)
		.go((data)=>{
			res.json(data);
		})
	}
	public latestList:RequestHandler = (req,res)=>{
		this.studyTbl
		.selectAll()
		.order({idx : 'desc'})
		.limit(9)
		.go(data=>{
			res.json(data);
		});
	}
	public search: RequestHandler = (req, res) => {
		this.studyTbl
		.selectList(req.body)
		.go((data)=>{
			res.json(data);
		})
	}
	public textSearch: RequestHandler = (req,res)=>{
		let getQuery = `
		select * from study
		where studyname like '%${req.body.search}%'
		order by c_date desc
		`;

		conn.query(getQuery, (err, data)=>{
			if(err){
				console.log(err);
			}else{
				if(data.length == 0){
					res.json({msg: 'no_res'});
				}else{
					res.json(data);
				}
			}
		})
	}
	public getOne : RequestHandler = (req, res) => {
		this.studyTbl
		.selectOne({idx: req.params.idx})
		.go((data)=>{
			res.json(data[0]);
		})
	}
	public getStudyInfo:RequestHandler = (req,res)=>{
		let getQuery = 
		`select a.*, b.id, b.email
		from study a
		inner join User b
		on a.admin = b.idx
		where a.idx = '${req.session.studyIdx}'
		`;

		conn.query(getQuery, (err, data)=>{
			if(err){
				console.log(err);
			}else{
				if(data.length == 0){
					res.json({msg: 'no_res'});
				}else{
					res.json(data[0]);
				}
			}
		})
	}
	public adminList: RequestHandler = (req, res) => {
		this.studyTbl
		.selectList({admin: req.session.userData.idx})
		.go((data)=>{
			res.json(data);
		})
	}
	public joinList: RequestHandler = (req,res) => {
		let getQuery = 
		`select b.*
		from s_member a
		inner join study b
		on a.study_idx = b.idx
		where a.user_idx = '${req.session.userData.idx}'
		and a.permission < 10`;
		console.log(getQuery);

		conn.query(getQuery, (err, data)=>{
			if(err){
				console.log(err);
			}else{
				if(data.length == 0){
					res.json({msg: 'no_res'});
				}else{
					res.json(data);
				}
			}
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

}

export const studyCtrl = new StudyCtrl();
