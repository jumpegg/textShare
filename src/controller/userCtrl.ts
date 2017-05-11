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
					// res.send(req.session.id);
				}else{
					res.send(false);
				}
			}
		});
	}
	public join: RequestHandler = (req, res) => {
		req.body.password = bcrypt.hashSync(req.body.password, this.salt);
		this.usertbl.insert(req.body).go((data) => {
			console.log(data);
		});
		// console.log(this.usertbl.insert(req.body).querychk());
	}
	public test: RequestHandler = (req, res) =>{
		res.json({ output : this.usertbl.defaultInfo()});
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
