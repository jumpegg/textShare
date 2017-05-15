import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StudyService } from '../../../service/study.service';
import { StudyPageInfo } from '../../../service/single_studypage';

@Component({
		styleUrls: ['client/component/study/studydata/study_studydata_new.component.css'],
		templateUrl: 'client/component/study/studydata/study_studydata_new.component.html',
		providers: [StudyService]
})
export class StudyNewData {
		constructor(
			public studyPage:StudyPageInfo,
			public router:Router
		){}
		ngOnInit(){
			this.studyPage.init();
		}
}