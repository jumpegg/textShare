import { RequestHandler } from 'express';
import * as request  from 'request';
import { conn } from '../util/connector';
import { Crud } from '../util/crud';

export class FreetalkCtrl{
	public freetalkTbl:any;

	constructor(){
		this.freetalkTbl = new Crud('freetalk');
	}

	public make:RequestHandler = (req, res)=>{
		req.body.study_idx = req.session.studyIdx;
		req.body.user_idx = req.session.userData.idx;
		req.body.id = req.session.userData.id;
		this.freetalkTbl
		.insert(req.body)
		.go((data)=>{
			res.json(data);
		})
	}

	public limitFTList:RequestHandler = (req, res)=>{
		this.freetalkTbl
		.selectList({study_idx : req.session.studyIdx})
		.order({idx : 'desc'})
		.limitFromTo((Number(req.params.idx)-1)*7 , 7)
		.go((data)=>{
			res.json(data);
		})
	}

	public getOne:RequestHandler = (req,res)=>{
		let getQuery = 
		`select b.id, a.* from freetalk a
		inner join User b
		on a.user_idx = b.idx
		where a.idx = ${req.params.idx}
		and a.study_idx = ${req.session.studyIdx}`;

		conn.query(getQuery, (err, data)=>{
			if(err){
				res.json({msg:'error'});
			}else{
				res.json(data);
			}
		})
	}

	public listCnt:RequestHandler = (req,res)=>{
		let getQuery = 
		`select count(*) as cnt
		from freetalk 
		where study_idx = ${req.session.studyIdx}`;

		conn.query(getQuery, (err, data)=>{
			if(err){
				res.json({msg:'error'});
			}else{
				res.json(data);
			}
		})
	}

	public update:RequestHandler = (req,res)=>{
		this.freetalkTbl
		.update(req.body)
		.go((data)=>{
			res.json(data);
		})
	}

	public delete:RequestHandler = (req,res)=>{
		this.freetalkTbl
		.delete(req.params.idx)
		.go((data)=>{
			res.json(data);
		})
	}

	public index:RequestHandler = (req,res) => {
		this.freetalkTbl
		.selectList({study_idx : req.session.studyIdx})
		.order({idx : 'desc'})
		.limitFromTo(0, 4)
		.go((data)=>{
			res.json(data);
		})
	}
}

export const freetalkCtrl = new FreetalkCtrl();