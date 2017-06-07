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
	public getAttendeeList:any[] = [];
	public tempAttendeeList:any[] = [];
	public newAccount:Account = new Account();
	public allCost:number;
	public idx:number;

	constructor(
		public studyPage:StudyPageInfo,
		public studyInfo:StudyInfo,
		public accountService:AccountService,
		public memberService:MemberService,
		public router:Router,
		public route:ActivatedRoute
	){}
	ngOnInit(){
		this.studyPage.init();
		this.idx = this.route.snapshot.params['idx'];
		if(this.idx){
			this.accountService
			.accGetOne(this.idx)
			.flatMap(
				data=>{
					this.newAccount = data;
					let dateTemp = new Date(data.gathering).toLocaleDateString();
					let dateA = dateTemp.replace(/. /g,'-').replace('.','');
					this.newAccount.gathering = dateA;
					return this.accountService.userList(this.idx);
				}
			).subscribe(
				data=>{
					this.attendeeList = data;
					this.attendeeList.map(input=>{
						input.state = false;
					})
					this.attendeeList.map(input =>{
						this.getAttendeeList.push(Object.assign({}, input));
					})
				}
			)
		}
		this.memberService.joinerList()
		.subscribe(
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
			input.cost = obj.allCost;
		})
	}

	move_to_after(){
		let obj = this;
		this.userList.map(function(input){
			if(input.state){
				input.state = false;
				if(!obj.attendeeList.find(x => x.user_idx === input.user_idx)){
					let tempUser:Acc_user = new Acc_user();
					tempUser.user_idx = input.user_idx;
					tempUser.is_pay = 0;
					tempUser.id = input.id;
					obj.attendeeList.push(tempUser);
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
		input.gathering = $('.datepicker').val()
		let costChk = false;
		let numChk = /^\d+$/;
		this.attendeeList.map(item =>{
			if(!numChk.test(item.cost)){
				costChk = true;
			}
		})
		if(!input.title){
			alert('회계명을 입력해주세요');
		}else if(input.title.trim().length == 0){
			alert('회계명을 입력해주세요');
		}else if(input.title.trim().length > 20){
			alert('회계명은 20자 이하로 정해주세요');
		}else if(!input.gathering){
			alert('날짜를 정해주세요');
		}else if(this.attendeeList.length == 0){
			alert('회계에 등록할 인원을 정해주세요');
		}else if(costChk){
			alert('금액 입력이 잘못되었습니다.');
		}else{
			if(input.idx){
				this.account_update(input);
			}else{
				this.account_create(input);
			}
		}
	}
	account_update(input){
		let final = true;
		let total_cost = 0;
		this.attendeeList.map(item => {
			total_cost += Number(item.cost);
		})
		input.total_cost = total_cost;
		this.accountService
		.accUpdate(input)
		.subscribe(
			data => {
				let obj = this;
				// 삭제된 리스트를 tempAttendeeList 에 저장
				if(data.msg == 'done'){
					this.getAttendeeList.map(item => {
						let chk = true;
						this.attendeeList.map(jtem => {
							if(jtem.idx){
								if(item.user_idx == jtem.user_idx){
									chk = false;
								}
							} 
						})
						if(chk){
							this.tempAttendeeList.push(item);
						}
					})
				}
				// 삭제후 다시 등록한 유저의 경우 idx를 다시 넣어주는 로직
				this.attendeeList.map(item=>{
					if(!item.idx){
						this.getAttendeeList.map(jtem=>{
							if(item.user_idx == jtem.user_idx){
								item.idx = jtem.idx;
							}
						})
					}
				})
				// attendeeList 에서 idx 의 유무에 따라 
				// create,update 로직을 수행
				this.attendeeList.map(item=>{
					delete item.state;
					if(item.idx){
						this.accountService
						.userUpdate(item)
						.subscribe(data=>{
							if(data.msg != 'done'){
								alert('오류가 발생했습니다.');
								final = false;	
							}
						})
					}else{
						item.acc_idx = input.idx;
						this.accountService
						.userCreate(item)
						.subscribe(data=>{
							if(data.msg != 'done'){
								alert('오류가 발생했습니다.');
								final = false;
							}else{
							}
						})
					}
				})
				// tempAttendeeList 는 삭제해야할 유저를 담고있다.
				// delete 로직을 수행한다.
				if(this.tempAttendeeList.length != 0){
					this.tempAttendeeList.map(temp=>{
						this.accountService
						.userDelete(temp.idx)
						.subscribe(data=>{
							if(data.msg != "done"){
								alert('오류가 발생했습니다.');
								final = false;
							}
							this.tempAttendeeList = [];
						})
					})
				}
				if(final){
					alert('등록되었습니다.');
					this.router.navigate(['/study/account']);
				}else{
					alert('오류가 발생했습니다.');
					this.router.navigate(['/study/account']);
				}
			}
		)

	}
	account_create(input){
		input.gathering = $('.datepicker').val();
		this.accountService
		.accCreate(input)
		.flatMap(
			data => {
				if(data.msg == 'done'){
					return this.accountService.accGetLastOne();
				}
			}
		).flatMap(
			data => {
				let obj = this;
				let userTemp:Acc_user = new Acc_user();
				let total_cost:number = 0;
				this.attendeeList.map(function(input){
					delete input.state;
					input.acc_idx = data[0].idx;
					total_cost += Number(input.cost);
					obj.accountService
					.userCreate(input)
					.subscribe(
						data=>{}
					)
				});
				let accountTemp:Account = new Account();
				accountTemp.idx = data[0].idx;
				accountTemp.total_cost = total_cost;
				accountTemp.total_num = this.attendeeList.length;
				return this.accountService.accUpdate(accountTemp);
			}
		).subscribe(
			data=>{
				if(data.msg == "done"){
					alert('등록되었습니다.');
					this.router.navigate(['/study/account']);
				}else{
					alert('오류가 발생했습니다.');
					this.router.navigate(['/study/account']);
				}
			}
		)
	}
}