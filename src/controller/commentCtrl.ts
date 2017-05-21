import { RequestHandler } from 'express';
import * as request  from 'request';
import { conn } from '../util/connector';
import { Crud } from '../util/crud';

export class CommentCtrl{
	public commentTbl:any;
	constructor(){
		this.commentTbl = new Crud('comment');
	}

	public make:RequestHandler = (req,res)=>{
		req.body.id = req.session.userData.id;
		req.body.user_idx = req.session.userData.idx;
		req.body.study_idx = req.session.studyIdx;
		this.commentTbl
		.insert(req.body)
		.go((data)=>{
			res.json(data);
		})
	}
	public list:RequestHandler = (req,res)=>{
		this.commentTbl
		.selectList(
			{
				study_idx:req.session.studyIdx,
				freetalk_idx:req.body.freetalk_idx
			}
		)
		.go((data)=>{
			res.json(data);
		})
	}
	public del:RequestHandler = (req,res)=>{
		this.commentTbl
		.delete(req.params.idx)
		.go((data)=>{
			res.json(data);
		})
	}
}

export const commentCtrl = new CommentCtrl();