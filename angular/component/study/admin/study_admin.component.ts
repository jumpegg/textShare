import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { StudyService } from '../../../service/study.service';
import { MemberService } from '../../../service/member.service';

import { StudyPageInfo } from '../../../service/single_studypage';

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
		constructor(
			public studyPage:StudyPageInfo,
			public memberService:MemberService
		){}
		ngOnInit(){
			this.studyPage.init();
			this.memberService.hoperList().subscribe(
				data => {
					this.hoperList = data;
				}
			)
			this.memberService.joinerList().subscribe(
				data => {
					this.joinerList = data;
				}
			)
		}
}