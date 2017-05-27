import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { StudyService } from '../../../service/study.service';
import { MemberService } from '../../../service/member.service';

import { StudyPageInfo } from '../../../global/single_studypage';

import { Member } from '../../../vo/member';

@Component({
		styleUrls: ['client/component/study/admin/study_admin.component.css'],
		templateUrl: 'client/component/study/admin/study_admin.component.html',
		providers: [MemberService]
})
export class StudyAdmin {
		public title:string;
		public joinerList:Member[];
		public hoperList:Member[];
		public user:any = {};
		constructor(
			public studyPage:StudyPageInfo,
			public memberService:MemberService
		){}
		ngOnInit(){
			this.studyPage.init();
			this.callThisUser();
			this.callHoper();
			this.callJoiner();
		}
		callThisUser(){
			this.memberService.getPermission()
			.subscribe(
				data=>{
					this.user = data[0];
					console.log(this.user);
				}
			)
		}
		callJoiner(){
			this.memberService.joinerList().subscribe(
				data => {
					if(!data.msg){
						this.joinerList = data;
					}else{
						this.joinerList = [];
					}
				}
			)
		}
		callHoper(){
			this.memberService.hoperList().subscribe(
				data => {
					if(!data.msg){
						this.hoperList = data;
						console.log(this.hoperList);
					}else{
						this.hoperList = [];
					}
				}
			)
		}
		reject(input){
			if(this.user.permission == 1){
				this.memberService.rejectMember({idx : input})
				.subscribe(
					data=>{
						alert('거절 되었습니다.');
						this.callHoper();
						this.callJoiner();
					}
				)
			}else{
				alert('권한이 없습니다.');
			}
		}
		allow(input){
			
			if(this.user.permission == 1){
				this.memberService.allowMember({idx : input})
				.subscribe(
					data=>{
						alert('승인 되었습니다.');
						this.callHoper();
						this.callJoiner();
					}
				)
			}else{
				alert('권한이 없습니다.');
			}
		}
}