import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Headers, Http, RequestOptions } from '@angular/http';
import { StudyService } from '../../../service/study.service';
import { MemberService } from '../../../service/member.service';
import { FlowService } from '../../../service/flow.service';
import { DataService } from '../../../service/data.service';
import { StudyPageInfo } from '../../../global/single_studypage';

import { Observable } from 'rxjs/Observable';

import { Flow } from '../../../vo/flow';

import { fadeInAnimation } from '../../animation/fadein'

declare var $ : any;

@Component({
		styleUrls: ['client/component/study/flow/study_flow.component.css'],
		templateUrl: 'client/component/study/flow/study_flow.component.html',
		providers: [StudyService, MemberService, FlowService, DataService],
		animations: [fadeInAnimation]
})
export class StudyFlow {
		private title:string;
		private detailState:string = "open";
		private iconState:string = "open";
		private newFlow:Flow = new Flow();
		private getFlow:Flow = new Flow();
		private getFileList = [];
		private userList:any[] = [];
		private flowList:any[] = [];
		private folderList:any[] = [];
		private dataList:any[] = [];
		private fileList:FileList;
		private folderIdx:number = null;
		private pageState:Boolean = false;

		constructor(
			public studyPage:StudyPageInfo,
			public memberService:MemberService,
			public dataService:DataService,
			public flowService:FlowService,
			private http:Http,
			public router:Router
		){
				this.title = "this is study flow";
		}
		ngOnInit(){
			this.studyPage.init();
			this.getUserList();
			this.getFlowList();
			this.getFolderList();
			$('.datepicker').pickadate({
				selectMonths: true,
				selectYears: 17,
				format: 'yyyy-mm-dd'
			});
		}
		getUserList(){
			this.memberService
			.joinerList()
			.subscribe(
				data=>{
					this.userList = data;
				}
			)
		}
		getFlowList(){
			this.flowService
			.list()
			.subscribe(
				data=>{
					if(!data.msg){
						this.flowList = data;
						this.getFlow = data[0];
						this.getFlowFileList(this.getFlow.idx);
					}else{
						this.getFlow = new Flow();
						this.getFlow.id = '작성자';
						this.getFlow.title = '등록된 글이 없습니다.';
						this.getFlow.content = '진행사항을 기록해 보세요!';
						this.pageState = true;
					}
				}
			)
		}
		getFlowOne(input){
			this.flowService
			.getOne(input)
			.subscribe(
				data=>{
					if(!data.msg){
						this.getFlow = data[0];
						this.getFlowFileList(this.getFlow.idx);
					}
				}
			)
		}
		getFolderList(){
			this.dataService
			.getFolderList()
			.subscribe(
				data=>{
					if(!data.msg){
						this.folderList = data;
					}else{
						this.folderList = [{}];
					}
				}
			)
		}
		flowSubmit(input){
			input.speak_date = $('.datepicker').val();
			
			if(!input.speak_date){
				alert('발표일을 정해주세요');
			}else if(!input.speaker){
				alert('발표자를 정해주세요');
			}else if(!input.title){
				alert('주제를 적어주세요');
			}else if(input.title.trim().length == 0){
				alert('주제를 적어주세요');
			}else if(input.title.trim().length > 20){
				alert('주제는 20자 이내로 해주세요');
			}else if(!input.content){
				alert('내용을 입력해주세요');
			}else if(input.content.trim().length == 0){
				alert('내용을 입력해주세요');
			}else{
				this.flowCreate(input);
			}
		}
		flowCreate(input){
			if(!input.idx){
				this.flowService
				.create(input)
				.flatMap(
					data=>{
						if(data.msg == "done"){
							return this.flowService.list()
						}
					}
				).flatMap(
					data=>{
						if(!data.msg){
							let formData:FormData = new FormData();
							if(this.fileList){
								for(let i=0; i< this.fileList.length; i++){
									let file: File = this.fileList[i];
									formData.append('uploadFile'+i , file, file.name);
								}
								return this.http.post(`/study/new_flow_file_data/${this.folderIdx}/${data[0].idx}`, formData)
								.map(res => res.json());
							}else{
								return Observable.of({msg:'done'});
							}
						}else{
							alert('문제가 생겼습니다.');
						}
					}
				).subscribe(
					data=>{
						if(data.msg=='done'){
							alert('등록되었습니다.');
							this.detailOpen();
							this.getFlowList();
							this.newFlow = new Flow();
						}else{
							alert('문제가 생겼습니다.');
							this.detailOpen();
							this.getFlowList();
							this.newFlow = new Flow();
						}
					}
				)
			}else{
				// this.getFileList
				this.flowService
				.update(input)
				.flatMap(
					data=>{
						if(data.msg=="done"){
							let formData:FormData = new FormData();
							if(this.fileList){
								for(let i=0; i< this.fileList.length; i++){
									let file:File = this.fileList[i];
									formData.append('uploadFile'+i, file, file.name);
								}
								return this.http.post(`/study/new_flow_file_data/${this.folderIdx}/${input.idx}`, formData)
								.map(res => res.json());
							}else{
								return Observable.of({msg:'done'});
							}
						}
					}
				).subscribe(
					data=>{
						if(data.msg=="done"){
							alert('등록되었습니다.');
							this.detailOpen();
							this.getFlowList();
							this.newFlow = new Flow();
						}else{
							alert('문제가 생겼습니다.');
							this.detailOpen();
							this.getFlowList();
							this.newFlow = new Flow();
						}
					}
				)
			}
		}
		setFileList(input){
			this.dataService
			.getFileList(input.target.value)
			.subscribe(
				data=>{
					this.dataList = data;
					this.folderIdx = input.target.value;
				}
			)
		}
		getFlowFileList(input){
			this.dataService
			.getFlowFileList(input)
			.subscribe(
				data=>{
					if(!data.msg){
						this.getFileList = data;
						this.pageState = true;
					}else if(data.msg == 'no_res'){
						this.getFileList = [];
						this.pageState = true;
					}else{
						alert('문제가 생겼습니다.');
						this.pageState = true;
					}
				}
			)
		}
		fileChange(event) {
			let chk_dupl = false;
			let sizeOver = false;
			let tempList = event.target.files;
			
			for(let i=0; i<tempList.length; i++){
				if(this.dataList.msg == 'no_res'){

				}else if(this.dataList.find(item=>{
							return (item.file_name == tempList[i].name);
						})){
					chk_dupl = true;
				}
			}
			for(let j=0; j<tempList.length; j++){
				if(tempList[j].size > 10485760){
					sizeOver = true;
				}
			}
			if(this.folderIdx == null){
				alert('파일을 저장할 폴더를 선택해주세요.');
				event.target.value = null;
			}else if(chk_dupl){
				alert('폴더 내 중복되는 파일명이 있습니다. 다시 선택해주세요');
				event.target.value = null;
			}else if(tempList.length + this.getFileList.length > 5){
				alert('파일은 5개 이하만 등록해주세요.');
				event.target.value = null;
			}else if(sizeOver){
				alert('파일의 최대 용량은 10MB까지 가능합니다.');
				event.target.value = null;
			}else{
				this.fileList = tempList;
			}
		}
		detailOpen(){
			this.detailState = 'open';
		}
		detailClose(){
			this.newFlow = new Flow();
			this.getFileList = [];
			this.detailState = 'close';
		}
		detailInfo(input){
			this.detailOpen();
			this.getFlowOne(input);
		}
		editFlow(input){
			this.flowService
			.getOne(input)
			.subscribe(
				data=>{
					if(!data.msg){
						this.newFlow = data[0];
						let dateTemp = new Date(this.newFlow.speak_date).toLocaleDateString();
						let dateA = dateTemp.replace(/. /g,'-').replace('.','');
						$('.datepicker').val(dateA);
						this.detailClose();
					}
				}
			)
		}
		deleteFlow(input){
			if(confirm('삭제하시겠습니까?')){
				this.flowService
				.delete(input)
				.subscribe(
					data=>{
						if(data.msg=='done'){
							alert('삭제되었습니다.');
							this.getFlowList();
						}else{
							alert('문제가 생겼습니다.');
						}
					}
				)
			}
		}
		deleteFile(input){
			if(confirm('파일을 제거하시겟습니까?')){
				this.dataService
				.deleteFile(input)
				.subscribe(
					data=>{
						if(data.msg == 'done'){
							alert('제거되었습니다.');
							this.getFlowFileList(this.newFlow.idx);
						}else{
							alert('제거 중 문제가 생겼습니다.');
						}
					}
				)
			}
		}
		flowCancel(){
			this.detailOpen();
			this.newFlow = new Flow();
		}
		
		
	
}