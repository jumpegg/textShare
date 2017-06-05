import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from '../../global/single_user';
import { PageInfo } from '../../global/single_info';
import { StudyInfo } from '../../global/single_study';
import { StudyPageInfo } from '../../global/single_studypage';
import { Observable } from 'rxjs/Observable';

import { MemberService } from '../../service/member.service';
import { StudyService } from '../../service/study.service';
import { UserService } from '../../service/user.service';

declare var $ : any;

@Component({
		styleUrls: ['client/component/study/study.component.css'],
		templateUrl: 'client/component/study/study.component.html',
		providers: [MemberService]
})
export class StudyComponent {
		private title:string;
		private member_chk:boolean = false;
		private studyDetail:any = {};
		private user:any = {};
		constructor(
			private router:Router,
			private userInfo:UserInfo,
			private pageInfo:PageInfo,
			private studyPage:StudyPageInfo,
			private studyInfo:StudyInfo,
			private memberService:MemberService,
			private studyService:StudyService,
			private userService:UserService
		){}
		ngOnInit(){
			this.studyPage.init();
			this.memberService.isMember()
			.flatMap(
				data=>{
					if(data.msg == 'member'){
						this.member_chk = true;
						return this.memberService.getUserInfo();
					}else if(data.msg == 'hoper'){
						this.member_chk = false;
						return Observable.of({msg:'not_user'});
					}else if(data.msg == 'guest'){
						this.member_chk = false;
						return Observable.of({msg:'not_user'});
					}
				}
			).subscribe(
				data=>{
					if(!data.msg){
						this.user = data;
						if(this.user.permission == 1){
							this.user.auth = "운영자";
						}else if(this.user.permission == 3){
							this.user.auth = "부운영자";
						}else if(this.user.permission == 5){
							this.user.auth = "스탭";
						}else {
							this.user.auth = "스터디원";
						}
						console.log(this.user);
					}else if(data.msg == 'not_user'){
						this.user.id = "회원가입을 해보세요";
						this.user.auth = "회원이 아닙니다"
					}
				}
			)
			
			$(".button-collapse").sideNav({
				edge: 'right'
			});
			$('#join').modal();
			this.studyService
			.getThisStudy()
			.subscribe(
				data=>{
					this.studyDetail = data;
				}
			)
		}
		modalOpen(){
			$('#join').modal('open');
		}
		modalClose(){
			$('#join').modal('close');
		}
		joinReq(){
			this.memberService
			.create()
			.subscribe(
				data=>{
					if(data.msg == 'done'){
						alert('가입요청이 완료되었습니다.');
					}else if(data.msg == 'already'){
						alert('이미 가입 신청을 하셧습니다');
					}else{
						alert('요청중 문제가 발생했습니다.');
					}
					this.modalClose();
				}
			)
		}
		logout(){
			this.userService
			.userLogout()
			.subscribe(
				data=>{
					if(data.msg=='logout_done'){
						this.router.navigate(['/']);
					}
				}
			)
		}

}