import { RequestHandler } from 'express';
import * as request  from 'request';
import { conn } from '../util/connector';
import { Crud } from '../util/crud';

export class MemberCtrl{
	public memberTbl:any;

	constructor(){
		this.memberTbl = new Crud('s_member');
	}
	public make:RequestHandler = (req, res) =>{
		let temp = {
			user_idx : req.session.userData.idx,
			study_idx : req.session.studyIdx,
			permission : 11
		}
		this.memberTbl.insert(temp).go((data) => {
			res.json(data);
		});
	}
	public joinerList:RequestHandler = (req, res) => {
		let getQuery = 
			`select * from s_member a 
			inner join User b
			on a.user_idx = b.idx
			where a.study_idx = ${req.session.studyIdx}
			and permission < 10`;
		conn.query(getQuery, (err, data) => {
			if(err){
				res.json({msg: 'error'})
			}else{
				res.json(data);
			}
		})
	}
	public hoperList:RequestHandler = (req, res) => {
		let getQuery = 
			`select * from s_member a 
			inner join User b
			on a.user_idx = b.idx
			where a.study_idx = ${req.session.studyIdx}
			and permission > 10`;
		conn.query(getQuery, (err, data) => {
			if(err){
				res.json({msg: 'error'})
			}else{
				res.json(data);
			}
		})
	}
}

export const memberCtrl = new MemberCtrl();