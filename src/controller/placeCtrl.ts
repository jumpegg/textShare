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
		req.body.use = 1;
		this.placeTbl.insert(req.body).go((data) => {
			res.json(data);
		});
	}
	public placeList:RequestHandler = (req, res) => {
		this.placeTbl
		.selectList({
			study_idx : req.params.idx,
			able : 1
		})
		.go((data) => {
			res.json(data);
		});
	}
	public getPlaces:RequestHandler = (req, res) => {
		this.placeTbl.selectList({study_idx : req.session.studyIdx}).go((data) => {
			res.json(data);
		});
	}
	public getPlace:RequestHandler = (req, res) => {
		this.placeTbl.selectOne({idx : req.params.idx}).go((data) => {
			res.json(data[0]);
		});
	}
	public placeRemove:RequestHandler = (req, res) => {
		this.placeTbl
		.update({
			idx : req.params.idx,
			able : 0
		}).go(data=>{
			res.json(data);
		})
	}
}

export const placeCtrl = new PlaceCtrl();