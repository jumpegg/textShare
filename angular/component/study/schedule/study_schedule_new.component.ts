import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StudyService } from '../../../service/study.service';
import { PlaceService } from '../../../service/place.service';
import { ScheduleService } from '../../../service/schedule.service';
import { StudyPageInfo } from '../../../global/single_studypage';
import { StudyInfo } from '../../../global/single_study';

import { Schedule } from '../../../vo/schedule';

declare var $ : any;
declare var naver : any;

@Component({
	styleUrls: ['client/component/study/schedule/study_schedule_new.component.css'],
	templateUrl: 'client/component/study/schedule/study_schedule_new.component.html',
	providers: [StudyService, PlaceService, ScheduleService]
})
export class StudyNewSchedule implements OnInit {
	public map: any;
	public placeList:any[] = [];
	public newSchedule:any;
	constructor(
		public studyService:StudyService,
		public placeService:PlaceService,
		public scheduleService:ScheduleService,
		public studyInfo:StudyInfo,
		public studyPage:StudyPageInfo,
		public router:Router){}
	ngOnInit(){
		this.newSchedule = new Schedule();
		this.placeService.getStudyPlaces().subscribe(
			data => {
				this.placeList = data;
			}
		);
		$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 17, // Creates a dropdown of 15 years to control year
			format: 'yyyy-mm-dd'
		});
		$('#start').pickatime({
			autoclose: false,
			twelvehour: false,
			default: '12:00:00'
		});
		$('#end').pickatime({
			autoclose: false,
			twelvehour: false,
			default: '12:00:00'
		});
	}
	scheduleSubmit(input){
		input.gathering = $('.datepicker').val();
		input.start = $('#start').val();
		input.end = $('#end').val();
		this.placeList.map(function(obj){
			if(obj.idx == input.place_idx){
				input.place_name = obj.name;
			}
		})
		this.scheduleService.create(input).subscribe(
			data=>{
				if(data.msg == 'done'){
					alert('등록되었습니다.');
					this.router.navigate(['/study/schedule']);
				}else{
					alert('오류가 발생했습니다.');
					this.router.navigate(['/study/schedule']);
				}
			}
		)
	}
}