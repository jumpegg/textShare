import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {trigger, state, style, animate, transition} from '@angular/animations';
import * as marked from 'marked';

import {PageInfo} from '../../../global/single_info';
import {UserInfo} from '../../../global/single_user';

import {TextShare} from '../../../vo/textshare';
import {Folder} from '../../../vo/folder';

import {FolderService} from '../../../service/folder.service';
import {TextShareService} from '../../../service/textshare.service';

declare var $ : any;

@Component({
	styleUrls: ['client/component/userpage/textShare/userTextShare.component.css'],
	templateUrl: 'client/component/userpage/textShare/userTextShare.component.html',
	animations: [
		trigger('folderToggle',[
			state('open', style({
			})),
			state('close',style({
				height: '0px'
			})),
			transition('open => close', animate('300ms ease-in')),
			transition('close => open', animate('300ms ease-out'))
		]),
		trigger('nameToggle',[
			state('open',style({

			})),
			state('close',style({
				width: '0px',
				display: 'none'
			})),
			transition('open => close', animate('300ms ease-in')),
			transition('close => open', animate('300ms ease-out'))
		])
	],
	providers: [FolderService, TextShareService]
})
export class UserTextShareComponent implements OnInit{

	private title:string;
	private aniStateVal:string = "close";
	private folderVo:Folder;
	private folders:Array<any>;
	private content:string = "";
	private itemActed:number;

	constructor(public page:PageInfo,public userInfo:UserInfo, public folderService:FolderService, public textShareService:TextShareService){
		this.folderVo = new Folder();
		this.folders = [];
		marked.setOptions({
			renderer: new marked.Renderer(),
			gfm: true,
			tables: true,
			breaks: true,
			pedantic: true,
			sanitize: true,
			smartLists: true,
			smartypants: true
		});
	}
	ngOnInit(){
		let tempFolder = new Folder();
		$('.scrollbar-outer').scrollbar();
		this.page.init();
		this.makeTree();
	}
	folderToggle(input){
		if(input.state == 'open'){
			input.state = 'close';
		}else{
			input.state = 'open';
		}
	}
	stateChange(){
		this.aniStateVal = this.aniStateVal == 'open' ? 'close' : 'open';
	}
	newFolder(){
		this.folderVo.user_idx = this.userInfo.idx;
		this.folderService.folderInsert(this.folderVo).subscribe(
			data => {
				if(data.msg == 'done'){
					this.makeTree();
				}else{
					alert('폴더 생성중 에러발생');
				}
			},
			error => {
				console.log(error);
			}
		)
	}
	contentShow(input){
		this.textShareService.tsRead(input.itemIdx).subscribe(
			data => {
				this.itemActed = input.itemIdx;
				this.content = marked(decodeURI(data.content));
			},
			error => console.log(error)
		)
	}
	makeTree(){
		this.folders = [];
		this.doPromise(this)
		.then(function(param:UserTextShareComponent){
			param.folderService.folderList().subscribe(
				data => {
					for(let i=0; i<data.length; i++){
						param.folders.push({
							idx : data[i].idx,
							name : data[i].name,
							items : [],
							state : 'close'
						});
					}
				},
				error => console.log(error)
			)
			return param;
		})
		.then(function(param:UserTextShareComponent){
			param.folderService.folderTreeList().subscribe(
				data => {
					for(let i=0; i < param.folders.length; i++){
						for(let j=0; j<data.length; j++){
							if(param.folders[i].idx == data[j].folder_idx){
								param.folders[i].items.push({
									itemName : data[j].title,
									itemIdx : data[j].idx,
									itemState : 'deactive'
								});
							}
						}
					}
				},
				error => console.log(error)
			)
		})
	}
	doPromise(input:UserTextShareComponent){
		return new Promise(function(resolve, reject){
			resolve(input);
		});
	}

}

@Component({
	styleUrls: ['client/component/userpage/textShare/userTextShare_new.component.css'],
	templateUrl: 'client/component/userpage/textShare/userTextShare_new.component.html',
	providers: [FolderService, TextShareService]
})
export class UserTextShareNewComponent implements OnInit{
	public tshare:TextShare;
	public converted:any;
	public beforeCon:any;
	public folderList:Array<any>;

	constructor(public page:PageInfo,public userInfo:UserInfo, public tshareService:TextShareService, public folderService:FolderService, public router:Router){
		this.tshare = new TextShare();
		this.beforeCon = "";
		marked.setOptions({
			renderer: new marked.Renderer(),
			gfm: true,
			tables: true,
			breaks: true,
			pedantic: true,
			sanitize: true,
			smartLists: true,
			smartypants: true
		});
	}

	ngOnInit(){
		$('.scrollbar-outer').scrollbar();
		this.page.init();
		$('select').material_select();
		this.folderService.folderList().subscribe(
			data=>{
				this.folderList = data;
			},
			error=>{
				console.log(error);
			}
		);
	}
	converter(){
		if(this.beforeCon != ""){
			this.converted = marked(this.beforeCon);
		}
	}
	newTShare(){
		this.tshare.content = encodeURI(this.beforeCon);
		this.tshareService.tsInsert(this.tshare).subscribe(
			data => {
				console.log(data);
				if(data.msg == "done"){
					alert("등록되었습니다.");
					this.router.navigate(['/userpage/textShare']);
				}
			},
			error => {
				console.log(error);
			}
		)
	}
}

