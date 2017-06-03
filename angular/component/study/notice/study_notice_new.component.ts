import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StudyService } from '../../../service/study.service';
import { NoticeService } from '../../../service/notice.service';
import { StudyPageInfo } from '../../../global/single_studypage';

import { Notice } from '../../../vo/notice';

@Component({
		styleUrls: ['client/component/study/notice/study_notice_new.component.css'],
		templateUrl: 'client/component/study/notice/study_notice_new.component.html',
		providers: [StudyService, NoticeService]
})
export class StudyNewNotice {
		public newNotice:Notice = new Notice();
		private idx:number;
		constructor(
			public studyPage:StudyPageInfo,
			public noticeService:NoticeService,
			public router:Router,
			public route:ActivatedRoute
		){}

		ngOnInit(){
			this.studyPage.init();
			this.idx = +this.route.snapshot.params['idx'];
			if(this.idx){
				this.noticeService
				.getOne(this.idx)
				.subscribe(
					data=>{
						this.newNotice = data[0];
					}
				)
			}
		}
		noticeSubmit(input){
			if(!input.title){
				alert('제목을 입력해주세요');
			}else if(input.title.trim().length == 0){
				alert('제목을 입력해주세요');
			}else if(input.title.trim().length > 30){
				alert('제목의 길이는 30자 이하로 정해주세요');
			}else if(!input.content){
				alert('내용을 입력해주세요');
			}else if(input.content.trim().length == 0){
				alert('내용을 입력해주세요');
			}else{
				this.noticeCreate(input);
			}
		}
		noticeCreate(input){
			if(input.idx){
				this.noticeService
				.update(input)
				.subscribe(
					data=>{
						if(data.msg == "done"){
							alert('등록되었습니다.');
						}else if(data.msg == "no_permission"){
							alert('권한이 없습니다.');
						}else{
							alert('오류가 발생했습니다.');
						}
						this.router.navigate(['/study/notice']);
					}
				)
			}else{
				this.noticeService
				.create(input)
				.subscribe(
					data=>{
						if(data.msg == "done"){
							alert('등록되었습니다.');
						}else if(data.msg == "no_permission"){
							alert('권한이 없습니다.');
						}else{
							alert('오류가 발생했습니다.');
						}
						this.router.navigate(['/study/notice']);
					}
				)
			}
		}
		backNotice(){
			this.router.navigate(['/study/notice']);
		}

}