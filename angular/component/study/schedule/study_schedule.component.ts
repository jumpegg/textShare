import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StudyService } from '../../../service/study.service';
import { StudyPageInfo } from '../../../service/single_studypage';

declare var $ : any;
declare var naver : any;
@Component({
	styleUrls: ['client/component/study/schedule/study_schedule.component.css'],
	templateUrl: 'client/component/study/schedule/study_schedule.component.html',
	providers: [StudyService],
	animations:[
		trigger('tableToggle',[
			state('open', style({})),
			state('close', style({
				height: '0px',
				display: 'none'
			})),
			transition('open => close', animate('300ms ease-in')),
			transition('close => open', animate('300ms ease-out'))
		])
	]
})
export class StudySchedule implements OnInit{
	public title: string;
	public map: any;
	public tableState:string = 'close';

	constructor(
		public studyPage:StudyPageInfo
	){}
	ngOnInit(){
		this.studyPage.init();
		this.map = new naver.maps.Map('map', {
			center: new naver.maps.LatLng(37.3595704, 127.105399),
			zoom: 5
		});
	}
	tableOpener(){
		this.tableState = (this.tableState == 'close') ? 'open' : 'close';
	}
}