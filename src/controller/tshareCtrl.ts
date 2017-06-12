import { RequestHandler } from 'express';
import * as request  from 'request';
import { conn } from '../util/connector';
import { Crud } from '../util/crud';

export class TextShareCtrl{
	public tsharetbl:any;

	constructor(){
		this.tsharetbl = new Crud('textshare');
	}
	public make:RequestHandler = (req, res) => {
		req.body.user_idx = req.session.userData.idx;
		this.tsharetbl
		.insert(req.body)
		.go((data) => {
			if(data.msg == 'done'){
				this.tsharetbl
				.selectList({user_idx:req.session.userData.idx})
				.order({c_date: 'desc'})
				.limit(1)
				.go(data=>{
					res.json(data[0].idx);
				})
			}else{
				res.json({msg : "error"});
			}
		});
	}
	public getContent:RequestHandler = (req, res) => {
		this.tsharetbl
		.selectOne({idx : req.params.idx})
		.go((data) => {
			res.json(data[0]);
		})
	}
	public update:RequestHandler = (req,res) => {
		this.tsharetbl
		.update(req.body)
		.go(data=>{
			res.json(data);
		})
	}
}

export const textShareCtrl = new TextShareCtrl();