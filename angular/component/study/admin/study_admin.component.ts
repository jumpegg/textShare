import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { StudyPageInfo } from '../../../service/single_studypage';

@Component({
		styleUrls: ['client/component/study/admin/study_admin.component.css'],
		templateUrl: 'client/component/study/admin/study_admin.component.html'
})
export class StudyAdmin {
		public title:string;
		constructor(
			public studyPage:StudyPageInfo
		){
				this.title = "this is study admin";
		}
		ngOnInit(){
			this.studyPage.init();
		}
}