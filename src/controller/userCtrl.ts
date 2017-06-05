import { RequestHandler } from 'express';
import { conn } from '../util/connector';
import { Crud } from '../util/crud';
import * as bcrypt from 'bcrypt-nodejs';

export class UserCtrl{
	public usertbl:any;
	public salt = bcrypt.genSaltSync(33);

	constructor(){
		this.usertbl = new Crud('User');
	}
	public login: RequestHandler = (req, res) => {
		this.usertbl.selectOne({id : req.body.id}).go((data)=>{
			if(data.msg == 'no_res'){
				console.log(data);
				res.json(data);
			}else{
				let comp = bcrypt.compareSync(req.body.password, data[0].password);
				if(comp){
					delete data[0].password;
					req.session.userData = data[0];
					req.session.login = true;
					res.send(comp);
				}else{
					res.send(false);
				}
			}
		});
	}
	public logout: RequestHandler = (req,res) =>{
		req.session
		.destroy(function(err){
				if(err){
						console.log(err);
				}else{
  				res.clearCookie('sid'); // 세션 쿠키 삭제	
					res.json({msg: "logout_done"});
				}
		})
		console.log(req.session);
	}
	public join: RequestHandler = (req, res) => {
		req.body.password = bcrypt.hashSync(req.body.password, this.salt);
		this.usertbl
		.insert(req.body)
		.go((data) => {
			res.json(data);
		});
	}
	public test: RequestHandler = (req, res) =>{
		this.usertbl
		.selectOne({id:req.body.id})
		.go(data => {
			if(data.msg == 'no_res'){
				res.json(data);
			}else{
				res.json({msg: 'using_id'});
			}
		});
	}
	public sess: RequestHandler = (req, res) => {
		if(req.session.login){
			res.send(req.session.login);
		}else{
			res.send(false);
		}
	}
	public userInfo: RequestHandler = (req, res) => {
		if(req.session.login){
			res.json(req.session.userData);
		}else{
			res.json({});
		}
	}
}

export const userCtrl = new UserCtrl();
