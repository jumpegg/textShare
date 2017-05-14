import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StudyService } from '../../../service/study.service';
import { StudyPageInfo } from '../../../service/single_studypage';

@Component({
		styleUrls: ['client/component/study/freetalk/study_freetalk.component.css'],
		templateUrl: 'client/component/study/freetalk/study_freetalk.component.html',
		providers: [StudyService]
})
export class StudyFreetalk {
		public title:string;
		constructor(
			public studyPage:StudyPageInfo
		){
				this.title = "this is study Freetalk";
		}
		ngOnInit(){
			this.studyPage.init();
		}
}