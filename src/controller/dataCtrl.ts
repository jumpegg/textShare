import { RequestHandler } from 'express';
import * as request  from 'request';
import * as fs from 'fs';
import * as formidable from 'formidable';
import { conn } from '../util/connector';
import { Crud } from '../util/crud';

export class DataCtrl{
	public datafolderTbl:any;
	public datafileTbl:any;
	constructor(){
		this.datafolderTbl = new Crud('data_folder');
		this.datafileTbl = new Crud('data_file');
	}

	// fs.mkdir('./newdir', 0666, function(err) {
	//   if(err) throw err;
	//   console.log('Created newdir');
	//   fs.rmdir('./newdir', function(err) {
	//     if(err) throw err;
	//     console.log('Removed newdir');
	//   });
	// });


	public folderMake:RequestHandler = (req,res)=>{
		let isStudy = __dirname+`/../../data/${req.session.studyIdx}`;
		let dir = isStudy+`/${req.body.folder_name}`;
		let obj = this;
		if(!fs.existsSync(isStudy)){
			fs.mkdir(isStudy);
		}
		if(!fs.existsSync(dir)){
			fs.mkdir(dir, function(err){
				if(err){
					console.log(err);
				}else{
					obj.datafolderTbl
					.insert({
						study_idx:req.session.studyIdx,
						folder_name:req.body.folder_name
					})
					.go((data)=>{
						res.json(data);
					})
				}
			});
		}else{
			res.json({msg:'error'});
		}
	}
	
	public fileMake:RequestHandler = (req,res)=>{
		let form = new formidable.IncomingForm();
		form.keepExtensions = true;
		let dir = __dirname+`/../../data/${req.session.studyIdx}`;
	}

	public folderList:RequestHandler = (req,res)=>{
		this.datafolderTbl
		.selectList({study_idx:req.session.studyIdx})
		.go((data)=>{
			res.json(data);
		});
	}
}

export const dataCtrl = new DataCtrl();