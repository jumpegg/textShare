import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StudyService } from '../../../service/study.service';
import { NoticeService } from '../../../service/notice.service';
import { StudyPageInfo } from '../../../global/single_studypage';

import { Notice } from '../../../vo/notice';

@Component({
		styleUrls: ['client/component/study/notice/study_notice_read.component.css'],
		templateUrl: 'client/component/study/notice/study_notice_read.component.html',
		providers: [StudyService, NoticeService]
})
export class StudyReadNotice{
	public idx:number;
	public notice:Notice = new Notice();
	constructor(
		public studyPage:StudyPageInfo,
		public noticeService:NoticeService,
		public router:Router,
		public route:ActivatedRoute
	){}
	ngOnInit(){
		this.studyPage.init();
		this.idx = +this.route.snapshot.params['idx'];
		this.noticeService
		.getOne(this.idx)
		.subscribe(
			data=>{
				this.notice = data[0];
				console.log(this.notice);
			}
		);
	}
}