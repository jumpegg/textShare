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
		constructor(
			public studyPage:StudyPageInfo,
			public noticeService:NoticeService,
			public router:Router
		){
			this.studyPage.init();
		}
		
		noticeSubmit(input){
			this.noticeService
			.create(input)
			.subscribe(
				data=>{
					if(data.msg == "done"){
						alert('등록되었습니다.');
						this.router.navigate(['/study/notice']);
					}
				}
			)
		}
		backNotice(){
			this.router.navigate(['/study/notice']);
		}
}