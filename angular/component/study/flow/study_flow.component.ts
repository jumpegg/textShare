import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Headers, Http, RequestOptions } from '@angular/http';
import { StudyService } from '../../../service/study.service';
import { MemberService } from '../../../service/member.service';
import { FlowService } from '../../../service/flow.service';
import { DataService } from '../../../service/data.service';
import { StudyPageInfo } from '../../../global/single_studypage';

import { Flow } from '../../../vo/flow';

declare var $ : any;

@Component({
		styleUrls: ['client/component/study/flow/study_flow.component.css'],
		templateUrl: 'client/component/study/flow/study_flow.component.html',
		providers: [StudyService, MemberService, FlowService, DataService]
})
export class StudyFlow {
		public title:string;
		public detailState:string = "open";
		public iconState:string = "open";
		public newFlow:Flow = new Flow();
		public getFlow:Flow = new Flow();
		public getFileList = [];
		public userList:any[] = [];
		public flowList:any[] = [];
		public folderList:any[] = [];
		public dataList:any[] = [];
		public fileList:FileList;
		public folderIdx:number = null;

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
		flowSubmit(input){
			input.speak_date = $('.datepicker').val();
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

							for(let i=0; i< this.fileList.length; i++){
								let file: File = this.fileList[i];
								formData.append('uploadFile'+i , file, file.name);
							}
							return this.http.post(`/study/new_flow_file_data/${this.folderIdx}/${data[0].idx}`, formData)
							.map(res => res.json());
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

							for(let i=0; i< this.fileList.length; i++){
								let file:File = this.fileList[i];
								formData.append('uploadFile'+i, file, file.name);
							}
							return this.http.post(`/study/new_flow_file_data/${this.folderIdx}/${input.idx}`, formData)
							.map(res => res.json());
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
					}else if(data.msg == 'no_res'){
						this.getFileList = [];
					}else{
						alert('문제가 생겼습니다.');
					}
				}
			)
		}
		fileChange(event) {
			let chk_dupl = false;
			let tempList = event.target.files;
			
			for(let i=0; i<tempList.length; i++){
				if(this.dataList.msg == 'no_res'){

				}else if(this.dataList.find(item=>{
					return (item.file_name == tempList[i].name);
				})){
					chk_dupl = true;
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
			}else{
				this.fileList = tempList;
			}
		}
		detailOpen(){
			this.detailState = 'open';
		}
		detailClose(){
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
			// console.log(input);
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
		
	
}