import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { Study } from '../../../vo/study';
import { Place } from '../../../vo/place';
import { StudyService } from '../../../service/study.service';
import { UserService } from '../../../service/user.service';
import { PlaceService } from '../../../service/place.service';
import { ScheduleService } from '../../../service/schedule.service';
import { PageInfo } from '../../../global/single_info';
import { UserInfo } from '../../../global/single_user';
import { StudyInfo } from '../../../global/single_study';

import { fadeInAnimation } from '../../animation/fadein';
import { HeightToggle } from '../../animation/heightToggle';
declare var $ : any;
declare var naver : any;
@Component({
	templateUrl: 'client/component/userpage/userStudyAdmin/userSTDAdmin.component.html',
	styleUrls: ['client/component/userpage/userStudyAdmin/userSTDAdmin.component.css'],
	providers: [ UserService, StudyService, PlaceService, ScheduleService ],
	animations: [
		HeightToggle,
		fadeInAnimation
	]
})
export class UserSTDAdminComponent{
	private newStudy:Study;
	private tempStudy:Study;
	private studyList:Study[] = [];
	private joinList:Study[] = [];
	private placeState:string = 'close';
	private placeModiState:string = 'close';
	private search_input:string = '';
	private markerList:any[] = [];
	private placeList:any[] = [];
	private modiPlaceList:any[] = [];
	private placeOne:Place;
	private clickMarker:any;
	private obv:Observable<any>;
	private mydata:Object;
	private newMap:any;
	private modiMap:any;
	private ginfo:any;

	private pageState:Boolean = false;
	private moveToStudy:Boolean = false;

	newStudyForm = new FormGroup({
		newStudyNameVali : new FormControl('', Validators.compose([Validators.required])),
		newStudyInfoVali : new FormControl('', Validators.compose([Validators.required]))
	});

	constructor(
		private userService:UserService,
		private placeService:PlaceService,
		private studyService:StudyService,
		private scheduleService:ScheduleService,
		private router:Router, 
		private route:ActivatedRoute, 
		private page:PageInfo, 
		private userInfo:UserInfo,
		private studyInfo:StudyInfo
	){}
	ngOnInit(){
		this.newStudy = new Study();
		this.tempStudy = new Study();
		this.placeOne = new Place();
		this.study_admin_list();
		this.study_join_list();
		this.page.init();
		let objSave = this;
		$('#newStudy').modal({
			complete: function(){
				objSave.markerListRefresher();
				objSave.placeState = 'close';
				objSave.placeList = [];
				objSave.placeOneRefresher()
				objSave.newStudy = new Study();
			}
		});
		$('#modiStudy').modal({
			complete: function(){
				objSave.markerListRefresher();
				objSave.placeState = 'close';
				objSave.placeList = [];
				objSave.placeOneRefresher();
				objSave.tempStudy = new Study();
			}
		});

		this.studyService
		.studyAdminList()
		.flatMap(
			data =>{
				if(!data.msg){
					this.studyList = data;
					this.setStudySchedule(this.studyList);
				}else{
					this.studyList = [];
				}
				return this.studyService.studyJoinList();
			}
		).subscribe(
			data=>{
				if(!data.msg){
					this.joinList = data;
					this.setStudySchedule(this.joinList);
				}else{
					this.joinList = [];
				}
				this.pageState = true;
			}
		)

		this.newMap = new naver.maps.Map('map', {
			center: new naver.maps.LatLng(37.3595704, 127.105399),
			zoom: 11
		});
		this.modiMap = new naver.maps.Map('modiMap', {
			center: new naver.maps.LatLng(37.3595704, 127.105399),
			zoom: 11
		});
	}
	study_submit(getStudy, getPlace, type){
		if(!getStudy.studyname){
			alert('스터디명을 입력해주세요');
		}else if(getStudy.studyname.trim().length == 0){
			alert('스터디명을 입력해주세요');
		}else if((getStudy.studyname.trim().length < 3) || (getStudy.studyname.trim().length > 20)){
			alert('스터디명은 3~20자 사이로 정해주세요');
		}else if(!getStudy.info){
			alert('스터디 설명을 적어주세요');
		}else if(getPlace.length == 0){
			alert('모임장소를 하나 이상 등록해주세요');
		}else{
			if(type == "new"){
				this.study_create(getStudy, getPlace);
			}else if(type == "modi"){
				this.study_modify(getStudy, getPlace);
			}
		}
	}
	study_create(getStudy, getPlace){
		getStudy.admin = this.userInfo.idx;
		let input = {
			study : getStudy,
			place : getPlace
		}
		this.studyService
		.studyNew(input)
		.subscribe(
			data =>{
				(data.msg == 'done') ? alert('등록되었습니다.') : alert('등록중 문제가 생겼습니다.')
				this.close_modal('#newStudy');
				this.study_admin_list();
				this.newStudy = new Study();
			},
			error => console.log(error)
		)
	}
	study_modify(getStudy, getPlace){
		let input = {
			study : getStudy,
			place : getPlace
		}
		this.studyService
		.studyModify(input)
		.subscribe(
			data => {
				(data.msg == 'done') ? alert('등록되었습니다.') : alert('등록중 문제가 생겼습니다.')
				this.close_modal('#modiStudy');
				this.study_admin_list();
				this.newStudy = new Study();
			}
		)
	}
	study_admin_list(){
		this.studyService.studyAdminList()
		.subscribe(
			data =>{
				if(!data.msg){
					this.studyList = data;
					this.setStudySchedule(this.studyList);
				}else{
					this.studyList = [];
				}
			},
			error => console.log(error)
		)
	}
	study_join_list(){
		this.studyService
		.studyJoinList()
		.subscribe(
			data=>{
				if(!data.msg){
					this.joinList = data;
					this.setStudySchedule(this.joinList);
				}else{
					this.joinList = [];
				}
			}
		)
	}
	setStudySchedule(input){
		input.map(item=>{
			this.scheduleService
			.recentSchedule({study_idx: item.idx})
			.subscribe(
				data=>{
					if(!data.msg){
						item.place_name = data.place_name;
						item.start = data.start;
					}else if(data.msg=="no_res"){
						item.place_name = "다음 모임일정이 없습니다.";
						item.start = "00:00";
					}else{
						console.log(data);
					}
				}
			)
		})
	}
	open_new_modal(){
		$('#newStudy').modal('open');
	}
	open_modi_modal(input){
		$('#modiStudy').modal('open');
		this.getStudyOne(input);
		this.getPlaceList(input);
	}
	getStudyOne(input){
		this.studyService
		.studyOne(input)
		.subscribe(
			data => {
				this.tempStudy = {
					idx : data.idx,
					admin : data.admin,
					studyname : data.studyname,
					info : data.info,
					c_date : data.c_date
				}
			}
		)
	}
	getPlaceList(input){
		this.placeService
		.getPlaceList(input)
		.subscribe(
			data => {
				if(data.msg != 'no_res'){
					this.placeList = data;
				}else{
					this.placeList = [];
				}
			},
			error => console.log(error)
		)
	}
	close_modal(input){
		$(input).modal('close');
	}
	move_search(){
		this.router.navigate(['/userpage/stdSearch']);
	}
	move_study(input){
		this.studyService
		.studyEnter(input)
		.subscribe(
			data => {
				this.studyInfo.idx = input;
				this.moveToStudy = true;
				this.router.navigate(['/study']);
			}
		)
	}
	toggleSearcher(){
		this.placeState = (this.placeState == 'open') ? 'close' : 'open';
	}
	toggleModiSearcher(){
		this.placeModiState = (this.placeModiState == 'open') ? 'close' : 'open';
	}
	place_search(input, mapInput){
		this.placeService
		.placeSearch(input)
		.subscribe(
			data=> {
				this.markerListRefresher();
				for(let item of data.items){
					this.markerList.push(this.markerTM128ToLatLng(item, mapInput));
				}
				for(let i=0; i<this.markerList.length; i++){
					let tempMap = mapInput;
					let marker_item = this.markerList[i];
					let item = data.items[i];
					let infoWindow = this.infoMaker(item);
//work
					this.infoAdd(this.placeOne, marker_item, tempMap, infoWindow, item);
				}
				mapInput.setCenter(naver.maps.TransCoord.fromTM128ToLatLng({x : data.items[0].mapx,y : data.items[0].mapy}));
				this.search_input = '';
			}
		)
	}
	infoMaker(item){
		return new naver.maps.InfoWindow({
			content: `
				<div class="iw_inner">
				<h5>${item.title}</h5>
				<hr>
				<p> 주소 : ${item.roadAddress}</p>
				<p>${item.telephone}  <span class="item_category">${item.category}</span></p>
				<p><a href="${item.link}">${item.link}</a></p>
				</div>
				`
		});
	}
	infoAdd(placeInput, markerInput, mapInput, infoInput, itemInput){
		naver.maps.Event.addListener(markerInput, 'click', function(e){
			placeInput.name = itemInput.title.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
			placeInput.mapx = markerInput.getPosition().x;
			placeInput.mapy = markerInput.getPosition().y;
			if(infoInput.getMap()){
				infoInput.close();
			}else{
				infoInput.open(mapInput, markerInput);
			}
		});
	}
	markerTM128ToLatLng(pointer, inputMap){
		return new naver.maps.Marker({
			position: naver.maps.TransCoord.fromTM128ToLatLng({x : pointer.mapx, y: pointer.mapy}),
			map: inputMap
		})
	}
// work
	place_insert(input){
		if(!input.name){
			alert('장소명을 입력해주세요');
		}else if(input.name.trim().length == 0){
			alert('장소명을 입력해주세요');
		}else if(!input.mapx){
			alert('좌표가 입력되지 않았습니다. 지도에서 찾아주세요');
		}else if(!input.mapy){
			alert('좌표가 입력되지 않았습니다. 지도에서 찾아주세요');
		}else{
			let placeTemp = Object.assign({}, input);
			this.placeList.push(placeTemp);
			this.placeOneRefresher();
			if(this.placeList.length >= 3){
				this.placeState = 'close';
				this.placeModiState = 'close';
			}
		}
	}
	place_remove(input, num){
		if(input.idx){
			this.placeService.placeRemove(input.idx).subscribe(
				data => {
					if(data.msg != 'done'){
						alert('서버 오류가 생겼습니다.');
					}else{
						alert('삭제되었습니다.');
						this.getPlaceList(this.tempStudy.idx);
					}
				}
			)
		}else{
			this.placeList.splice(num, 1);
		}
	}
	showPlaceInfo(input){
		// this.placeOne = input;
	}

	showModiPlaceInfo(input){
		this.placeModiState = 'open';
		this.markerListRefresher();
		let obj = this;
		let modiMarker = new naver.maps.Marker({
			position : new naver.maps.LatLng(Number(input.mapy), Number(input.mapx)),
			map: this.modiMap
		})
		let infoWindow = this.makeInfoWindow(input.name);
		
		this.markerList.push(modiMarker);
		this.modiMap.setCenter(
			new naver.maps.LatLng(input.mapy,input.mapx)
		);

		naver.maps.Event.addListener(modiMarker, "click", function(e) {
				if (infoWindow.getMap()) {
						infoWindow.close();
				} else {
						infoWindow.open(obj.modiMap, modiMarker);
				}
		});
		// 처음에 바로 정보창을 띄우면 정보창 wrap이 안뜨는 현상 발생
		// infoWindow.open(obj.modiMap, modiMarker);
	}
	makeMap(map, mapy, mapx, zoomLv:number){
		return new naver.maps.Map(map, {
			center: new naver.maps.LatLng(Number(mapy), Number(mapx)),
			zoom: zoomLv
		});
	}
	makeInfoWindow(input){
		return new naver.maps.InfoWindow({
				content: `
					<div class="modi_iw_inner">
					<h6>${input}</h6>
					</div>
					`
			});
		}
	markerListRefresher(){
		for(let mark of this.markerList){
			mark.setMap(null);
		}
		this.markerList = [];
	}
	placeOneRefresher(){
		if(this.placeOne.idx){
				delete this.placeOne.idx;
			}
			this.placeOne.name = '';
			this.placeOne.mapx = 0;
			this.placeOne.mapy = 0;
	}
}
