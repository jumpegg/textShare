import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AccountService } from '../../../service/account.service';
import { MemberService } from '../../../service/member.service';
import { StudyPageInfo } from '../../../global/single_studypage';
import { StudyInfo } from '../../../global/single_study';
import 'rxjs/add/operator/mergeMap';

import { Acc_user } from '../../../vo/acc_user';
import { Account } from '../../../vo/account';

declare var $ : any;

@Component({
		styleUrls: ['client/component/study/account/study_acc_new.component.css'],
		templateUrl: 'client/component/study/account/study_acc_new.component.html',
		providers: [AccountService, MemberService]
})
export class StudyNewAcc {
	public userList:any[];
	public attendeeList:any[] = [];
	public newAccount:Account = new Account();
	public allCost:number;

	constructor(
		public studyPage:StudyPageInfo,
		public studyInfo:StudyInfo,
		public accountService:AccountService,
		public memberService:MemberService,
		public router:Router
	){}
	ngOnInit(){
		this.studyPage.init();
		this.memberService.joinerList().subscribe(
			data => {
				if(data.msg == 'no_res'){
					this.userList = [];
				}else{
					this.userList = data;
					this.userList.map(function(input){
						input.state = false;
					})
				}
			}
		)
		$('.datepicker').pickadate({
			selectMonths: true,
			selectYears: 17,
			format: 'yyyy-mm-dd'
		});
	}
	all_cost(){
		let obj = this;
		this.attendeeList.map(function(input){
			console.log(input);
			input.cost = obj.allCost;
		})
	}
	move_to_after(){
		let obj = this;
		this.userList.map(function(input){
			if(input.state){
				input.state = false;
				if(!obj.attendeeList.find(x => x.idx === input.idx)){
					let copy = Object.assign({}, input);
					obj.attendeeList.push(copy);
				}
			}
		})
	}
	move_to_before(){
		let tempArr = [];
		this.attendeeList.map(function(input){
			if(input.state == false){
				tempArr.push(input);
			}
		});
		this.attendeeList = tempArr;
	}
	account_submit(input){
		input.gathering = $('.datepicker').val();
		input.study_idx = this.studyInfo.idx;
		this.accountService.accCreate(input)
		.flatMap(
			data => {
				console.log(data);
				if(data.msg == 'done'){
					return this.accountService.accGetLastOne();
				}
			}
		)
		.flatMap(
			data => {
				let obj = this;
				let userTemp:Acc_user = new Acc_user();
				let total_cost:number = 0;
				this.attendeeList.map(function(input){
					delete input.state;
					userTemp.is_pay = 0;
					userTemp.user_idx = input.user_idx;
					userTemp.acc_idx = data[0].idx;
					userTemp.cost = input.cost;
					total_cost += Number(input.cost);
					obj.accountService.userCreate(userTemp).subscribe(
						data=>{
							console.log(data);
						}
					)
				});
				let accountTemp:Account = new Account();
				accountTemp.idx = data[0].idx;
				accountTemp.total_cost = total_cost;
				accountTemp.total_num = this.attendeeList.length;
				console.log(accountTemp);
				return this.accountService.accUpdate(accountTemp);
			}
		)
		.subscribe(
			data=>{
				console.log(data);
			}
		)
	}
}