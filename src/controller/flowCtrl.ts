import { RequestHandler } from 'express';
import * as request  from 'request';
import { conn } from '../util/connector';
import { Crud } from '../util/crud';

export class FlowCtrl{
	public flowTbl:any;

	constructor(){
		this.flowTbl = new Crud('flow');
	}
	public make:RequestHandler = (req,res)=>{
		req.body.study_idx = req.session.studyIdx;
		req.body.user_idx = req.session.userData.idx;
		req.body.id = req.session.userData.id;
		this.flowTbl
		.insert(req.body)
		.go((data)=>{
			res.json(data);
		})
	}
	public list:RequestHandler = (req,res)=>{
		this.flowTbl
		.selectList({study_idx : req.session.studyIdx})
		.order({speak_date: 'desc'})
		.go((data)=>{
			res.json(data);
		})
	}
	public getOne:RequestHandler = (req,res)=>{
		this.flowTbl
		.selectOne({
			idx : req.params.idx,
			study_idx : req.session.studyIdx
		})
		.go((data)=>{
			res.json(data);
		})
	}
	public update:RequestHandler = (req,res)=>{
		this.flowTbl
		.update(req.body)
		.go((data)=>{
			res.json(data);
		})
	}
	public delete:RequestHandler = (req,res)=>{
		this.flowTbl
		.delete(req.params.idx)
		.go((data)=>{
			res.json(data);
		})
	}
}

export const flowCtrl = new FlowCtrl();