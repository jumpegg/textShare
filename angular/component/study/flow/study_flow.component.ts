import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StudyService } from '../../../service/study.service';
import { MemberService } from '../../../service/member.service';
import { FlowService } from '../../../service/flow.service';
import { DataService } from '../../../service/data.service';
import { StudyPageInfo } from '../../../service/single_studypage';

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
		public userList:any[] = [];
		public flowList:any[] = [];
		public folderList:any[] = [];
		public dataList:any[] = [];
		public fileList:FileList;
		constructor(
			public studyPage:StudyPageInfo,
			public memberService:MemberService,
			public dataService:DataService,
			public flowService:FlowService,
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
						console.log(this.getFlow);
					}
				}
			)
		}
		flowSubmit(input){
			input.speak_date = $('.datepicker').val();
			if(!input.idx){
				this.flowService
				.create(input)
				.subscribe(
					data=>{
						if(data.msg=="done"){
							alert('등록되었습니다.');
							this.detailClose();
							this.getFlowList();
							this.newFlow = new Flow();
						}
					}
				)
			}else{
				this.flowService
				.update(input)
				.subscribe(
					data=>{
						if(data.msg=="done"){
							alert('등록되었습니다.');
							this.detailClose();
							this.getFlowList();
							this.newFlow = new Flow();
						}
					}
				)
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
						console.log(this.folderList);
					}else{
						this.folderList = [{}];
					}
				}
			)
		}
		// fileChange(event) {
		// 		this.fileList = event.target.files;
		// 		this.dataList = [];
		// 		for(let i=0; i<this.fileList.length; i++){
		// 			this.dataList.push(this.fileList[i]);
		// 		}
		// }
		// fileSubmit(){
		// 	let chk_dupl = false;
		// 	if(this.fileList.length > 0){
		// 		for(let i=0; i<this.fileList.length; i++){
		// 			if(this.getfileList.find(item=>{
		// 				return (item.file_name == this.fileList[i].name);
		// 			})){
		// 				chk_dupl = true;
		// 			}
		// 		}
		// 		if(chk_dupl){
		// 			alert('중복되는 파일명이 있습니다.');
		// 		}else{
		// 			let formData:FormData = new FormData();

		// 			for(let i=0; i<this.fileList.length; i++){
		// 				let file: File = this.fileList[i];
		// 				formData.append('uploadFile'+i , file, file.name);
		// 			}

		// 			this.http.post('/study/new_file_data/'+this.idx, formData)
		// 				.map(res => res.json())
		// 				.subscribe(
		// 					data => {
		// 						if(data.msg=='done'){
		// 							alert('등록되었습니다.');
		// 							this.initFileList();
		// 						}else{
		// 							alert('문제가 생겼습니다.');
		// 							this.initFileList();
		// 						}
		// 					}
		// 				)
		// 		}
		// 	}else{
		// 		alert('파일을 선택해주세요');
		// 	}
		// }
}