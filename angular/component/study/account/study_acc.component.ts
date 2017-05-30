import { Component, OnInit} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StudyService } from '../../../service/study.service';
import { AccountService } from '../../../service/account.service';
import { StudyPageInfo } from '../../../global/single_studypage';
import { StudyInfo } from '../../../global/single_study';

import { Acc_user } from '../../../vo/acc_user';
import { Acc_info } from '../../../vo/acc_info';
import { Account } from '../../../vo/account';

declare var $ : any;
declare var naver : any;

@Component({
		styleUrls: ['client/component/study/account/study_acc.component.css'],
		templateUrl: 'client/component/study/account/study_acc.component.html',
		providers: [StudyService, AccountService],
		animations:[
			trigger('tableToggle',[
				state('open', style({})),
				state('close', style({
					height: '0px',
					display: 'none'
				})),
				transition('open => close', animate('300ms ease-in')),
				transition('close => open', animate('300ms ease-out'))
			]),
			trigger('infoToggle',[
				state('open', style({})),
				state('close', style({
					height: '0px',
					display: 'none'
				})),
				transition('open => close', animate('300ms ease-in')),
				transition('close => open', animate('300ms ease-out'))
			])
		]
})
export class StudyAcc {
		public title:string;
		public accLatest:Account = new Account();
		public newInfo:Acc_info = new Acc_info();
		public upUser:Acc_user = new Acc_user();
		public totalCost:number = 0;
		public resCost:number = 0;
		//state
		public tableState:string = 'close';
		public infoState:string = 'close';
		// is
		public isAccLatest:boolean;
		public isInfoList:boolean;
		public isUserList:boolean;
		// list
		public accList:any[] = [];
		public userList:any[] = [];
		public infoList:any[] = [];
		constructor(
			public studyPage:StudyPageInfo,
			public accountService:AccountService
		){
			this.studyPage.init();
		}
		ngOnInit(){
			this.accountService.accList()
			.flatMap(
				data=>{
					if(!data.msg){
						this.accList = data;
						this.accLatest = data[0];
						this.isAccLatest = true;
					}else{
						this.isAccLatest = false;
					}
					return this.accountService.userList(this.accList[0].idx);
				}
			)
			.flatMap(
				data=>{
					if(!data.msg){
						this.userList = data;
						this.userList.map(function(input){
							input.is_pay = input.is_pay == "true";
						})
						this.isUserList = true;
					}else{
						this.isUserList = false;
					}
					return this.accountService.infoList(this.accList[0].idx);
				}
			)
			.subscribe(
				data=>{
					if(!data.msg){
						let obj = this;
						this.infoList = data;
						this.infoList.map(function(input){
							obj.totalCost += Number(input.cost);
						})
						this.resCost =this.accLatest.total_cost - this.totalCost;
						this.isInfoList = true;
					}else{
						this.isInfoList = false;
					}
				}
			)
		}
		tableOpener(){
			this.tableState = (this.tableState == 'close') ? 'open' : 'close';
		}
		infoAddOpener(){
			this.infoState = (this.infoState == 'close') ? 'open' : 'close';
		}
		infoSubmit(){
			this.newInfo.acc_idx = this.accLatest.idx;
			this.accountService
				.infoCreate(this.newInfo)
				.flatMap(
					data=>{
						return this.accountService.infoList(this.accLatest.idx);
					}
				)
				.subscribe(
					data=>{
						let obj = this;
						this.infoList = data;
						this.totalCost = 0;
						this.isInfoList = true;
						this.infoList.map(function(input){
								obj.totalCost += Number(input.cost);
						})
						this.resCost =this.accLatest.total_cost - this.totalCost;
					}
				)
		}
		infoRemove(input){
			this.accountService
				.infoDelete(input)
				.flatMap(
					data=>{
						if(data.msg == 'done'){
							return this.accountService.infoList(this.accLatest.idx);
						}
					}
				)
				.subscribe(
					data=>{
						if(!data.msg){
							let obj = this;
							this.infoList = data;
							this.totalCost = 0;
							this.infoList.map(function(input){
								obj.totalCost += Number(input.cost);
							})
							this.resCost =this.accLatest.total_cost - this.totalCost;
							this.isInfoList = true;
						}else{
							this.totalCost = 0;
							this.resCost =this.accLatest.total_cost - this.totalCost;
							this.isInfoList = false;
						}
					}
				)
		}
		userIsPayUpdate(){
			let obj = this;
			this.userList.map(function(input){
				console.log(input);
				let upUser = new Acc_user();
				upUser.idx = input.idx;
				upUser.is_pay = input.is_pay;
				obj.accountService
				.userUpdate(upUser)
				.subscribe(
					data =>{
						console.log(data);
					}
				)
			})
		}
		
}