import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as marked from 'marked';
import 'rxjs/add/operator/mergeMap';

import { PageInfo } from '../../../global/single_info';
import { UserInfo } from '../../../global/single_user';
import { TextShare } from '../../../vo/textshare';
import { Folder } from '../../../vo/folder';

import { FolderService } from '../../../service/folder.service';
import { TextShareService } from '../../../service/textshare.service';

declare var $ : any;

@Component({
	styleUrls: ['client/component/userpage/textShare/userTextShare.component.css'],
	templateUrl: 'client/component/userpage/textShare/userTextShare.component.html',
	animations: [
		trigger('folderToggle',[
			state('open', style({})),
			state('close',style({
				height: '0px'
			})),
			transition('open => close', animate('300ms ease-in')),
			transition('close => open', animate('300ms ease-out'))
		]),
		trigger('nameToggle',[
			state('open',style({})),
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

	private title:string = "";
	private aniStateVal:string = "close";
	private folderVo:Folder;
	private folders:Array<any>;
	private content:string = "";
	private itemActed:number;
	private pageState:Boolean = false;

	constructor(
		private page:PageInfo,
		private router:Router,
		private userInfo:UserInfo, 
		private folderService:FolderService, 
		private textShareService:TextShareService
	){
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
	newFolder_submit(){
		if(!this.folderVo.name){
			alert('폴더명을 입력해주세요');
		}else if(this.folderVo.name.trim().length == 0){
			alert('폴더명을 입력해주세요');
		}else if(this.folderVo.name.trim().length > 20){
			alert('폴더이름은 20자 이하로 정해주세요');
		}else{
			this.newFolder();
		}
	}
	newFolder(){
		this.folderVo.user_idx = this.userInfo.idx;
		
		if(!this.folderVo.name){
			alert("폴더명을 입력해주세요");
		}else{
			this.folderService.folderInsert(this.folderVo).subscribe(
				data => {
					if(data.msg == 'done'){
						this.makeTree();
						this.folderVo = new Folder();
					}else{
						alert('폴더 생성중 에러발생');
					}
				},
				error => {
					console.log(error);
				}
			)
		}
	}
	contentShow(input){
		this.pageState = false;
		this.textShareService.tsRead(input.itemIdx).subscribe(
			data => {
				this.title = data.title;
				this.itemActed = input.itemIdx;
				this.content = marked(decodeURI(data.content));
				this.pageState = true;
			},
			error => console.log(error)
		)
	}
	makeTree(){
		this.pageState = false;
		this.folders = [];
		this.folderService
		.folderList()
		.flatMap(
			data => {
				this.folders = data;
				this.folders.map(folder=>{
					folder.items = [];
					folder.state = 'close';
				})
				return this.folderService.folderTreeList()
			}
		).subscribe(
			data => {
				this.folders.map(folder=>{
					data.map(item=>{
						if(folder.idx == item.folder_idx){
							folder.items.push({
								itemName : item.title,
								itemIdx : item.idx,
								itemState : 'deactive'
							});
						}
					})
					this.pageState = true;
				})
			}
		)
	}
	modiTShare(input){
		this.router.navigate(['/userpage/textShareNew/'+input]);
		console.log(input);
	}
}

@Component({
	styleUrls: ['client/component/userpage/textShare/userTextShare_new.component.css'],
	templateUrl: 'client/component/userpage/textShare/userTextShare_new.component.html',
	providers: [FolderService, TextShareService],
	animations: [
		trigger('helpToggle',[
			state('close', style({})),
			state('open',style({
				marginRight: '0px'
			})),
			transition('open => close', animate('300ms ease-in')),
			transition('close => open', animate('300ms ease-out'))
		]),
	]
})
export class UserTextShareNewComponent implements OnInit{
	private tshare:TextShare;
	private converted:any;
	private beforeCon:any;
	private folderList:Array<any>;
	private helpState:string = 'close';

	constructor(
		private page:PageInfo,
		private userInfo:UserInfo, 
		private tshareService:TextShareService, 
		private folderService:FolderService, 
		private router:Router,
		private route:ActivatedRoute
	){
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
		this.page.init();
		if(this.route.snapshot.params['idx']){
			this.tshare.idx =  this.route.snapshot.params['idx'];
			this.getTShare(this.tshare.idx);
		}
		$('select').material_select();
		this.folderService
		.folderList()
		.subscribe(
			data=>{this.folderList = data;},
			error=>{console.log(error);}
		);
	}
	getTShare(input){
		this.tshareService
		.tsRead(input)
		.subscribe(
			data=>{
				this.tshare.title = data.title;
				this.tshare.folder_idx = data.folder_idx;
				this.tshare.c_date = data.c_date;
				this.beforeCon = decodeURI(data.content);
				this.converter();
				console.log(this.tshare);
			}
		)
	}
	helpToggle(){
		this.helpState = (this.helpState == 'close') ? 'open' : 'close';
	}
	tabcancle(input){
		if(input.keyCode == 9){
			this.beforeCon += "\t";
			if(input.preventDefault){
				input.preventDefault();
			}
			return false;
		}
	}
	selectChange(input){
		this.tshare.folder_idx = input.target.value;
	}
	converter(){
		if(this.beforeCon != ""){
			this.converted = marked(this.beforeCon);
		}
	}
	tShareSubmit(input){
		let isTrue = true;
		if(!this.tshare.folder_idx){
			alert('폴더를 선택해주세요');
		}
		Object.keys(input).map(key=>{
			isTrue = isTrue && input[key];
		});
		// delete this.tshare.c_date;
		if(isTrue && !this.tshare.idx){
			console.log("new called");
			this.tshare.content = encodeURI(this.beforeCon);
			this.tshareService.tsInsert(this.tshare).subscribe(
				data => {
					if(!data.msg){
						alert("등록되었습니다.");
						this.router.navigate(['/userpage/textShareNew/'+ data]);
					}
				},
				error => {
					console.log(error);
				}
			)
		}else if(isTrue && this.tshare.idx){
			console.log("update called");
			this.tshare.content = encodeURI(this.beforeCon);
			this.tshareService.tsUpdate(this.tshare).subscribe(
				data => {
					if(data.msg == "done"){
						alert("등록되었습니다.");
					}
				}
			)
		}else{
			alert('올바른 값을 입력해주세요');
		}
	}
}

