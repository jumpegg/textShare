import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { StudyService } from '../../../service/study.service';
import { PlaceService } from '../../../service/place.service';
import { ScheduleService } from '../../../service/schedule.service';

import { StudyPageInfo } from '../../../global/single_studypage';

import { Schedule } from '../../../vo/schedule';
import { Place } from '../../../vo/place';

declare var $ : any;
declare var naver : any;
@Component({
	styleUrls: ['client/component/study/schedule/study_schedule.component.css'],
	templateUrl: 'client/component/study/schedule/study_schedule.component.html',
	providers: [StudyService, PlaceService, ScheduleService],
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
	public marker: any;
	public tableState:string = 'close';
	public schList:Schedule[] = [];
	public lastSch:Schedule = new Schedule();
	public lastPlc:Place = new Place();
	public tempSch:any;
	public continue:boolean;

	constructor(
		public studyPage:StudyPageInfo,
		public studyService:StudyService,
		public placeService:PlaceService,
		public scheduleService:ScheduleService,
		public router:Router
	){}
	ngOnInit(){
		this.studyPage.init();
		this.tempSch = {
			gathering : new Date(),
			place_name : '다음 모임을 등록해보세요.',
			start : '00:00',
			end : '00:00',
			cost: 0
		}
		this.scheduleService.list()
		.map(
			data=>{
				this.continue = true;
				if(data.msg == 'no_res'){
					this.schList = [];
					this.lastSch = this.tempSch;
					this.continue = false;
					this.mapDefault();
				}else{
					this.schList = data;
					if(new Date(data[0].gathering) < new Date()){
						this.lastSch = this.tempSch;
						this.mapDefault();
						this.continue = false;
					}else{
						this.lastSch = data[0];
					}
				}
				return this.continue;
			}
		).subscribe(
			(data) => {
				if(data){
					this.placeService
						.getStudyPlace(this.lastSch.place_idx)
						.subscribe((data)=>{
							this.lastPlc = data;
							let obj = this;
							this.map = this.makeMap('map', this.lastPlc.mapy, this.lastPlc.mapx, 11);
							this.marker = this.makeMarker(this.lastPlc.mapy, this.lastPlc.mapx);
							let infoWindow = this.makeInfoWindow(this.lastPlc.name);

							naver.maps.Event.addListener(this.marker, "click", function(e) {
									if (infoWindow.getMap()) {
											infoWindow.close();
									} else {
											infoWindow.open(obj.map, obj.marker);
									}
							});

							infoWindow.open(this.map, this.marker);
					})
				}else{
					this.lastPlc.name = '다음 모임을 등록해보세요.';
				}
			}
		);
	}

	setSchedule(input){
		this.scheduleService.getOne(input)
		.flatMap(
			data=>{
				this.lastSch = data;
				return this.placeService.getStudyPlace(this.lastSch.place_idx)
			}
		).subscribe(
			data=>{
				this.lastPlc = data;
				let obj = this;
				this.map = this.makeMap('map', this.lastPlc.mapy, this.lastPlc.mapx, 11);
				this.marker = this.makeMarker(this.lastPlc.mapy, this.lastPlc.mapx);
				let infoWindow = this.makeInfoWindow(this.lastPlc.name);

				naver.maps.Event.addListener(this.marker, "click", function(e) {
						if (infoWindow.getMap()) {
								infoWindow.close();
						} else {
								infoWindow.open(obj.map, obj.marker);
						}
				});

				infoWindow.open(this.map, this.marker);
			}
		)
	}
	tableOpener(){
		this.tableState = (this.tableState == 'close') ? 'open' : 'close';
	}
	mapDefault(){
		this.map = new naver.maps.Map('map', {
			center: new naver.maps.LatLng(37.3595704, 127.105399),
			zoom: 5
		});
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