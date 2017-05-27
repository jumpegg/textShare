import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from '../../global/single_user';
import { PageInfo } from '../../global/single_info';
import { StudyInfo } from '../../global/single_study';
import { StudyPageInfo } from '../../global/single_studypage';

import { MemberService } from '../../service/member.service';
import { StudyService } from '../../service/study.service';

declare var $ : any;

@Component({
		styleUrls: ['client/component/study/study.component.css'],
		templateUrl: 'client/component/study/study.component.html',
		providers: [MemberService]
})
export class StudyComponent {
		public title:string;
		public member_chk:boolean = false;
		public studyDetail = {};
		constructor(
			public userInfo:UserInfo,
			public pageInfo:PageInfo,
			public studyPage:StudyPageInfo,
			public studyInfo:StudyInfo,
			public memberService:MemberService,
			public studyService:StudyService
			){
				this.memberService.isMember()
				.subscribe(
					data=>{
						if(data.msg == 'member'){
							this.member_chk = true;
						}else if(data.msg == 'hoper'){
							this.member_chk = false;
						}else if(data.msg == 'guest'){
							this.member_chk = false;
						}
					}
				)
			}
		ngOnInit(){
			this.studyPage.init();
			$(".button-collapse").sideNav({
				edge: 'right'
			});
			$('#join').modal();
			this.studyService
			.getThisStudy()
			.subscribe(
				data=>{
					this.studyDetail = data;
					console.log(data);
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

}