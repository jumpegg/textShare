import { RequestHandler } from 'express';
import * as request  from 'request';
import { conn } from '../util/connector';
import { Crud } from '../util/crud';

export class MemberCtrl{
	public memberTbl:any;

	constructor(){
		this.memberTbl = new Crud('s_member');
	}
	public getPermission:RequestHandler = (req,res) => {
		this.memberTbl.selectOne({
			user_idx : req.session.userData.idx,
			study_idx : req.session.studyIdx
		}).go(data=>{
			if(!data.msg){
				res.json(data);
			}else{
				console.log(data.msg);
				res.json({msg: 'error'});
			}
		})
	}
	public setPermission:RequestHandler = (req,res) => {
		if(req.session.studyAuth > 3){
			res.json({msg: 'permission denied'});
		}else{
			this.memberTbl
			.update(req.body)
			.go(data=>{
				if(data.msg == 'done'){
					res.json(data);
				}else{
					console.log(data.msg);
					res.json({msg: 'error'});
				}
			})
		}
	}
	public make:RequestHandler = (req,res) =>{
		let temp = {
			user_idx : req.session.userData.idx,
			study_idx : req.session.studyIdx,
			permission : 11
		}
		this.memberTbl.selectOne({
			user_idx : req.session.userData.idx,
			study_idx : req.session.studyIdx
		}).go(data=>{
			if(data.msg == 'no_res'){
				this.memberTbl.insert(temp).go((data) => {
					res.json(data);
				});
			}else{
				res.json({msg:'already'});
			}
		})
	}
	public isMember:RequestHandler = (req,res)=>{
		this.memberTbl.selectOne({
			user_idx : req.session.userData.idx,
			study_idx : req.session.studyIdx,
		}).go(data=>{
			if(!data.msg){
				if(data[0].permission > 10){
					res.json({msg:'hoper'});
				}else if(data[0].permission < 10){
					res.json({msg:'member'});
				}else{
					res.json({msg:'error'});
				}
			}else{
				res.json({msg:'guest'});
			}
		})
	}
	public joinerList:RequestHandler = (req,res) => {
		let getQuery = 
			`select a.*, b.id from s_member a 
			inner join User b
			on a.user_idx = b.idx
			where a.study_idx = ${req.session.studyIdx}
			and a.permission < 10`;
		conn.query(getQuery, (err, data) => {
			if(err){
				res.json({msg: 'error'})
			}else{
				res.json(data);
			}
		})
	}
	public hoperList:RequestHandler = (req,res) => {
		let getQuery = 
			`select a.*, b.id from s_member a 
			inner join User b
			on a.user_idx = b.idx
			where a.study_idx = ${req.session.studyIdx}
			and a.permission > 10`;
		conn.query(getQuery, (err, data) => {
			if(err){
				res.json({msg: 'error'})
			}else{
				res.json(data);
			}
		})
	}
	public allow:RequestHandler = (req,res) => {
		this.memberTbl
		.update({
			idx : req.body.idx,
			permission : 9
		})
		.go(data=>{
			res.json(data);
		})
	}
	public reject:RequestHandler = (req,res) => {
		this.memberTbl
		.update({
			idx : req.body.idx,
			permission : 13
		})
		.go(data=>{
			res.json(data);
		})
	}
}

export const memberCtrl = new MemberCtrl();