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
		this.tsharetbl.insert(req.body).go((data) => {
			res.json(data);
		});
	}
	public getContent:RequestHandler = (req, res) => {
		this.tsharetbl.selectOne({idx : req.params.idx}).go((data) => {
			res.json(data[0]);
		})
	}
}

export const textShareCtrl = new TextShareCtrl();