import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IMyOptions} from 'mydatepicker';
import {StudyService} from '../../../service/study.service';


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



@Component({
	styleUrls: ['client/component/study/schedule/study_schedule_new.component.css'],
	templateUrl: 'client/component/study/schedule/study_schedule_new.component.html',
	providers: [StudyService]
})
export class StudyNewSchedule implements OnInit {
	public title:string;
	public map: any;
	
	private myDatePickerOptions: IMyOptions = {
		dateFormat: 'dd.mm.yyyy'
	};

	private model: Object = {date : {year:2018, month: 10, day: 9}};

	constructor(private studyService:StudyService){
		
	}
	ngOnInit(){
	this.map = new naver.maps.Map('map', {
			center: new naver.maps.LatLng(37.3595704, 127.105399)
		});
	}
	
	maptest(){
		this.map.setOptions();
	}
}

