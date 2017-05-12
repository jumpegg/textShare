import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMyOptions } from 'mydatepicker';
import { StudyService } from '../../../service/study.service';
import { StudyPageInfo } from '../../../service/single_studypage';

declare var $ : any;
declare var naver : any;
@Component({
	styleUrls: ['client/component/study/schedule/study_schedule.component.css'],
	templateUrl: 'client/component/study/schedule/study_schedule.component.html',
	providers: [StudyService]
})
export class StudySchedule implements OnInit{
	public title: string;

	constructor(){
		this.title = "this is study schedule";
	}
	ngOnInit(){

	}
}