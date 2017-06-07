import { RequestHandler } from 'express';
import * as request  from 'request';
import { conn } from '../util/connector';
import { Crud } from '../util/crud';

export class FolderCtrl{
	private foldertbl:Crud;
	private tstbl:Crud;

	constructor(){
		this.foldertbl = new Crud('folder');
		this.tstbl = new Crud('textshare');
	}

	public make: RequestHandler = (req, res) => {
		this.foldertbl.insert(req.body).go((data)=>{
			res.json(data);
		});
	}
	public list: RequestHandler = (req, res) => {
		let input = {user_idx : req.session.userData.idx };
		let list = [];
		this.foldertbl.selectList(input).go((data) => {
			for(var i=0; i < data.length; i++){
				list.push({
					name:data[i].name,
					idx:data[i].idx
				});
			}
			res.json(list);
		});
	}
	public treeList: RequestHandler = (req, res) => {
		let customQry = `SELECT a.*, b.*
					FROM folder a
					RIGHT JOIN textshare b
					ON a.idx = b.folder_idx
					WHERE a.user_idx = ${req.session.userData.idx}`
		conn.query(customQry, (err, data) => {
			if(err){
				console.log(err);
			}else{
				res.json(data);
			}
		})
	}
}

export const folderCtrl = new FolderCtrl();