import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudyPageInfo } from '../../../service/single_studypage';
import { StudyInfo } from '../../../service/single_study';

import { StudyService } from '../../../service/study.service';
import { NoticeService } from '../../../service/notice.service';
import { FreetalkService } from '../../../service/freetalk.service';
import { ScheduleService } from '../../../service/schedule.service';

import { Schedule } from '../../../vo/schedule';
import { Freetalk } from '../../../vo/freetalk';
import { Notice } from '../../../vo/notice';

declare var $ : any;
declare var naver : any;

@Component({
		styleUrls: ['client/component/study/index/study_index.component.css'],
		templateUrl: 'client/component/study/index/study_index.component.html',
		providers: [StudyService, NoticeService, FreetalkService, ScheduleService]
})
export class StudyIndex {
		public title:string;
		public map: any;
		public noticeList:any[] = [];
		public freetalkList:any[] = [];
		public schedule:any = new Schedule();
		constructor(
			public studyPage:StudyPageInfo,
			public studyInfo:StudyInfo,
			public studyService:StudyService,
			public noticeService:NoticeService,
			public freetalkService:FreetalkService,
			public scheduleService:ScheduleService,
			public router:Router
		){}

		ngOnInit(){
			this.studyPage.init();
			this.getNoticeList();
			this.getFreetalkList();
			this.getSchedule();
		}

		getNoticeList(){
			this.noticeService
			.forIndex()
			.subscribe(
				data=>{
					if(!data.msg){
						this.noticeList = data
					}else{
						this.noticeList=[
							{
								c_date: "2017-05-20T01:11:04.000Z",
								id: "작성자",
								title: "등록된 공지사항이 없습니다."
							}
						]
					}
				}
			)
		}
		getFreetalkList(){
			this.freetalkService
			.forIndex()
			.subscribe(
				data=>{
					if(!data.msg){
						this.freetalkList = data
					}else{
						this.freetalkList=[
							{
								c_date: "2017-05-20T01:11:04.000Z",
								id: "작성자",
								title: "등록된 게시글이 없습니다."
							}
						]
					}
				}
			)
		}
		getSchedule(){
			this.scheduleService
			.forIndex()
			.subscribe(
				data=>{
					if(!data.msg){
						this.schedule = data[0];
						this.map = new naver.maps.Map('map', {
							center: new naver.maps.LatLng(Number(this.schedule.mapy), Number(this.schedule.mapx)),
							zoom: 11
						});
					}
					console.log(data);
				}
			)
		}

}