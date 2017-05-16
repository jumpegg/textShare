import { RequestHandler } from 'express';
import * as request  from 'request';
import { conn } from '../util/connector';
import { Crud } from '../util/crud';

export class ScheduleCtrl{
	public scheduleTbl:any;

	constructor(){
		this.scheduleTbl = new Crud('schedule');
	}
	public make:RequestHandler = (req, res) => {
		req.body.study_idx = req.session.studyIdx;
		this.scheduleTbl.insert(req.body).go((data) => {
			res.json(data);
		});
	}
	public list:RequestHandler = (req, res) => {
		this.scheduleTbl.selectList({study_idx : req.session.studyIdx})
		.order({idx : 'desc'})
		.limit(3)
		.go((data) => {
			res.json(data);
		});
	}
	public getSchedule:RequestHandler = (req, res) => {
		this.scheduleTbl.selectOne({idx : req.params.idx}).go((data) => {
			res.json(data[0]);
		});
	}
}

export const scheduleCtrl = new ScheduleCtrl();