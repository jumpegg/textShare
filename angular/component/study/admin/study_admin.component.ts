import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { StudyService } from '../../../service/study.service';
import { MemberService } from '../../../service/member.service';

import { StudyPageInfo } from '../../../global/single_studypage';

import { Member } from '../../../vo/member';

declare var $ : any;
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
		public setAuth:string = "";
		private setIdx:number;
		constructor(
			public studyPage:StudyPageInfo,
			public memberService:MemberService
		){}
		ngOnInit(){
			this.studyPage.init();
			$('#authModi').modal();
			this.callThisUser();
			this.callHoper();
			this.callJoiner();
		}
		callThisUser(){
			this.memberService.getPermission()
			.subscribe(
				data=>{
					this.user = data[0];
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
					}else{
						this.hoperList = [];
					}
				}
			)
		}
		reject(input){
			if(this.user.permission <= 3){
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
			if(this.user.permission <= 3){
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
		changeAuth(input){
			
		}
		submitAuth(input){
			if(!this.user.permission){
				alert('잘못된 접근입니다.');
				this.modalClose();
			}else if(this.user.permission > 3){
				alert('권한이 없습니다.')
				this.modalClose();
			}else {
				if(this.setAuth == ''){
					alert('변경할 권한을 지정해주세요');
				}else if(this.setAuth == 'subAD'){
					this.memberService
					.setPermission({
						idx : this.setIdx,
						permission : 3
					}).subscribe(data=>{
						if(data.msg == 'done'){
							alert('등록되었습니다.');
							this.modalClose();
						}else{
							alert('오류가 발생했습니다.');
							this.modalClose();
						}
					})
				}else if(this.setAuth == 'manager'){
					this.memberService
					.setPermission({
						idx : this.setIdx,
						permission : 5
					}).subscribe(data=>{
						if(data.msg == 'done'){
							alert('등록되었습니다.');
							this.modalClose();
						}else{
							alert('오류가 발생했습니다.');
							this.modalClose();
						}
					})
				}else if(this.setAuth == 'block'){
					this.memberService
					.setPermission({
						idx : this.setIdx,
						permission : 15
					}).subscribe(data=>{
						if(data.msg == 'done'){
							alert('등록되었습니다.');
							this.modalClose();
						}else{
							alert('오류가 발생했습니다.');
							this.modalClose();
						}
					})
				}
			}
		}
		modalOpen(input){
			this.setIdx = input;
			$('#authModi').modal('open');
		}
		modalClose(){
			$('#authModi').modal('close');
		}
}