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
		// let files = [];
		let form = new formidable.IncomingForm();
		let obj = this;
		form.keepExtensions = true;
		form.multiples = true;
		
		this.datafolderTbl
		.selectOne({
			idx : req.params.idx,
			study_idx : req.session.studyIdx
		})
		.go(data=>{
			if(!data.msg){
				let folderInfo = data[0];
				let dir = __dirname + `/../../data/${req.session.studyIdx}/${folderInfo.folder_name}`;
				let shortDir = `/data/${req.session.studyIdx}/${folderInfo.folder_name}`;
				// formidable start
				form.uploadDir = dir;
				
				form.on('fileBegin', function (name, file){
					obj.datafileTbl.insert({
						study_idx : req.session.studyIdx,
						folder_idx : req.params.idx,
						folder_name : folderInfo.folder_name,
						file_name : file.name,
						file_url : shortDir + '/' + file.name
					}).go(data=>{
						console.log(data);
					})
				});
				form.on('file', (field, file)=>{
					fs.rename(file.path, form.uploadDir + '/' + file.name);
				}).on('end', ()=>{
					res.json({msg:'done'});
				}).on('error', error=>{
					console.log('file upload error : ' + error);
				});
				console.log(form);
				form.parse(req);
			}else{
				res.json({msg:'error'});
			}
		})
	}
	public isFile:RequestHandler = (req,res)=>{
		this.datafileTbl
		.selectOne({
			study_idx: req.session.studyIdx,
			folder_idx: req.body.folder_idx,
			file_name: req.body.file_name
		})
		.go(data=>{
			res.json(data);
		})
	}
	public folderList:RequestHandler = (req,res)=>{
		this.datafolderTbl
		.selectList({study_idx:req.session.studyIdx})
		.go((data)=>{
			res.json(data);
		});
	}
	public fileList:RequestHandler = (req,res)=>{
		this.datafileTbl
		.selectList({
			study_idx:req.session.studyIdx,
			folder_idx: req.params.idx
		})
		.go(data=>{
			res.json(data);
		});
	}
}

export const dataCtrl = new DataCtrl();