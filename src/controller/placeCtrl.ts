import { RequestHandler } from 'express';
import * as request  from 'request';
import { conn } from '../util/connector';
import { Crud } from '../util/crud';

export class PlaceCtrl{
	public placeTbl:any;

	constructor(){
		this.placeTbl = new Crud('s_place');
	}
	public make:RequestHandler = (req, res) => {
		this.placeTbl.insert(req.body).go((data) => {
			res.json(data);
		});
	}
	public placeList:RequestHandler = (req, res) => {
		this.placeTbl.selectList({study_idx : req.params.idx}).go((data) => {
			res.json(data);
		});
	}
	public getPlace:RequestHandler = (req, res) => {
		this.placeTbl.selectOne({idx : req.params.idx}).go((data) => {
			res.json(data[0]);
		});
	}
	public placeRemove:RequestHandler = (req, res) => {
		this.placeTbl.delete(req.params.idx).go((data) => {
			res.json(data);
		})
	}
}

export const placeCtrl = new PlaceCtrl();