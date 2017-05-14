import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StudyService } from '../../../service/study.service';
import { StudyPageInfo } from '../../../service/single_studypage';

@Component({
		styleUrls: ['client/component/study/notice/study_notice.component.css'],
		templateUrl: 'client/component/study/notice/study_notice.component.html',
		providers: [StudyService]
})
export class StudyNotice {
		public title:string;
		constructor(
			public studyPage:StudyPageInfo
		){
				this.title = "this is study notice";
		}
		ngOnInit(){
			this.studyPage.init();
		}
}