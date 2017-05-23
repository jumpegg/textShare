import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StudyService } from '../../../service/study.service';
import { MemberService } from '../../../service/member.service';
import { FlowService } from '../../../service/flow.service';
import { StudyPageInfo } from '../../../service/single_studypage';

import { Flow } from '../../../vo/flow';

declare var $ : any;

@Component({
		styleUrls: ['client/component/study/flow/study_flow.component.css'],
		templateUrl: 'client/component/study/flow/study_flow.component.html',
		providers: [StudyService, MemberService, FlowService]
})
export class StudyFlow {
		public title:string;
		public detailState:string = "close";
		public newFlow:Flow = new Flow();
		public getFlow:Flow = new Flow();
		public userList:any[] = [];
		public flowList:any[] = [];
		constructor(
			public studyPage:StudyPageInfo,
			public memberService:MemberService,
			public flowService:FlowService,
			public router:Router
		){
				this.title = "this is study flow";
		}
		ngOnInit(){
			this.studyPage.init();
			this.getUserList();
			this.getFlowList();
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
						this.getFlowOne(1);
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
			this.detailClose();
			this.getFlowOne(input);
		}
		editFlow(input){
			this.flowService
			.getOne(input)
			.subscribe(
				data=>{
					if(!data.msg){
						this.newFlow = data[0];
						let dateTemp = new Date(this.newFlow.speak_date);
						$('.datepicker').val(new Date(this.newFlow.speak_date));
						this.detailOpen();
					}
				}
			)
		}
		deleteFlow(input){

		}
}