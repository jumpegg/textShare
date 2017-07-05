import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudyPageInfo } from '../../../global/single_studypage';
import { StudyInfo } from '../../../global/single_study';

import { StudyService } from '../../../service/study.service';
import { NoticeService } from '../../../service/notice.service';
import { FreetalkService } from '../../../service/freetalk.service';
import { ScheduleService } from '../../../service/schedule.service';

import { Schedule } from '../../../vo/schedule';
import { Freetalk } from '../../../vo/freetalk';
import { Notice } from '../../../vo/notice';

import { fadeInAnimation } from '../../animation/fadein';

declare var $ : any;
declare var naver : any;

@Component({
		styleUrls: ['client/component/study/index/study_index.component.css'],
		templateUrl: 'client/component/study/index/study_index.component.html',
		providers: [StudyService, NoticeService, FreetalkService, ScheduleService],
		animations: [fadeInAnimation]
})
export class StudyIndex {
		private title:string;
		private map: any;
		private marker: any;
		private noticeList:any[] = [];
		private freetalkList:any[] = [];
		private schedule:any = new Schedule();
		private pageState:Boolean = false;
		private noticeReady:Boolean = false;
		private freetalkReady:Boolean = false;
		private scheduleReady:Boolean = false;

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
			this.getSchedule();
			this.getNoticeList();
			this.getFreetalkList();
		}
		readyChk(){
			if(this.noticeReady && this.freetalkReady && this.scheduleReady){
				this.pageState = true;
			}
		}
		getNoticeList(){
			this.noticeService
			.forIndex()
			.subscribe(
				data=>{
					if(!data.msg){
						this.noticeList = data;
						this.noticeReady = true;
						this.readyChk();
					}else{
						this.noticeList=[{
							c_date: new Date(),
							id: "작성자",
							title: "등록된 공지사항이 없습니다."
						}];
						this.noticeReady = true;
						this.readyChk();
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
						this.freetalkList = data;
						this.freetalkReady = true;
						this.readyChk();
					}else{
						this.freetalkList=[{
							c_date: new Date(),
							id: "작성자",
							title: "등록된 게시글이 없습니다."
						}];
						this.freetalkReady = true;
						this.readyChk();
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
						let obj = this;
						this.schedule = data[0];
						this.map = this.makeMap('map', this.schedule.mapy, this.schedule.mapx, 11);
						this.marker = this.makeMarker(this.schedule.mapy, this.schedule.mapx);
						let infoWindow = this.makeInfoWindow(this.schedule.place_name);
						
						naver.maps.Event.addListener(this.marker, "click", function(e) {
								if (infoWindow.getMap()) {
										infoWindow.close();
								} else {
										infoWindow.open(obj.map, obj.marker);
								}
						});

						infoWindow.open(this.map, this.marker);
						this.scheduleReady = true;
						this.readyChk();
					}else{
						this.schedule.start = "00:00";
						this.schedule.end = "00:00";
						this.schedule.gathering = new Date();
						this.schedule.cost = "등록된 다음 모임이 없습니다.";
						this.schedule.place_name = "다음 모임을 등록해보세요!";
						this.map = new naver.maps.Map('map', {
							zoom: 11
						});
						this.scheduleReady = true;
						this.readyChk();
					}
				}
			)
		}
		makeMap(map, mapy, mapx, zoomLv:number){
			return new naver.maps.Map(map, {
							center: new naver.maps.LatLng(Number(mapy), Number(mapx)),
							zoom: zoomLv
						});
		}
		makeMarker(mapy, mapx){
			return new naver.maps.Marker({
								position: new naver.maps.LatLng(Number(mapy), Number(mapx)),
								map: this.map
						});
		}
		makeInfoWindow(input){
			return new naver.maps.InfoWindow({
							content: `
								<div class="iw_inner">
								<h5>${input}</h5>
								</div>
								`
						});
		}

}