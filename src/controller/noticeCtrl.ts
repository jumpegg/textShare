import { RequestHandler } from 'express';
import * as request  from 'request';
import { conn } from '../util/connector';
import { Crud } from '../util/crud';

export class NoticeCtrl{
	public noticeTbl:any;

	constructor(){
		this.noticeTbl = new Crud('notice');
	}
	public make:RequestHandler = (req, res)=>{
		if(req.session.studyAuth < 5){
			req.body.study_idx = req.session.studyIdx;
			req.body.user_idx = req.session.userData.idx;
			req.body.id = req.session.userData.id;
			this.noticeTbl
			.insert(req.body)
			.go((data)=>{
				res.json(data);
			})
		}else{
			res.json({msg: 'no_permission'});
		}
	}

	public limitFTList:RequestHandler = (req, res)=>{
		this.noticeTbl
		.selectList({study_idx : req.session.studyIdx})
		.order({idx : 'desc'})
		.limitFromTo((Number(req.params.idx)-1)*7 , 7)
		.go((data)=>{
			res.json(data);
		})
	}

	public getOne:RequestHandler = (req,res)=>{
		let getQuery = 
		`select b.id, a.* from notice a
		inner join User b
		on a.user_idx = b.idx
		where a.idx = ${req.params.idx}`;

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
		from notice 
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
		if(req.session.studyAuth < 5){
			this.noticeTbl
			.update(req.body)
			.go((data)=>{
				res.json(data);
			})
		}else{
			res.json({msg:"no_permission"});
		}
	}

	public delete:RequestHandler = (req,res)=>{
		this.noticeTbl
		.delete(req.params.idx)
		.go((data)=>{
			res.json(data);
		})
	}
	public index:RequestHandler = (req,res)=>{
		this.noticeTbl
		.selectList({study_idx : req.session.studyIdx})
		.order({idx : 'desc'})
		.limitFromTo(0 , 4)
		.go((data)=>{
			res.json(data);
		})
	}
}

export const noticeCtrl = new NoticeCtrl();