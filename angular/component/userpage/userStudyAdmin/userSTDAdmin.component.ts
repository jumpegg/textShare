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
import { PageInfo } from '../../../service/single_info';
import { UserInfo } from '../../../service/single_user';
import { StudyInfo } from '../../../service/single_study';

declare var $ : any;
declare var naver : any;
@Component({
	templateUrl: 'client/component/userpage/userStudyAdmin/userSTDAdmin.component.html',
	styleUrls: ['client/component/userpage/userStudyAdmin/userSTDAdmin.component.css'],
	providers: [ UserService, StudyService, PlaceService ],
	animations: [
		trigger('placeToggle',[
			state('open', style({

			})),
			state('close', style({
				height: '0px',
				display: 'none'
			})),
			transition('open => close', animate('300ms ease-in')),
			transition('close => open', animate('300ms ease-out'))
		]),
		trigger('placeModiToggle', [
			state('open', style({

			})),
			state('close', style({
				height: '0px',
				display: 'none'
			})),
			transition('open => close', animate('300ms ease-in')),
			transition('close => open', animate('300ms ease-out'))
		])
	]
})
export class UserSTDAdminComponent{
	private newStudy:Study;
	private tempStudy:Study;
	private studyList:Study[];
	private joinList:Study[];
	private placeState:string = 'close';
	private placeModiState:string = 'close';
	private search_input:string;
	private markerList:any[] = [];
	private placeList:any[] = [];
	private modiPlaceList:any[] = [];
	private placeOne:Place;
	private clickMarker:any;
	private obv:Observable<any>;
	public mydata:Object;
	public newMap:any;
	public modiMap:any;

	newStudyForm = new FormGroup({
		newStudyNameVali : new FormControl('', Validators.compose([Validators.required])),
		newStudyInfoVali : new FormControl('', Validators.compose([Validators.required]))
	});

	constructor(
		private userService:UserService,
		private placeService:PlaceService,
		private studyService:StudyService,
		private router:Router, 
		private route:ActivatedRoute, 
		public page:PageInfo, 
		public userInfo:UserInfo,
		public studyInfo:StudyInfo
	){
		this.newStudy = new Study();
		this.tempStudy = new Study();
		this.placeOne = new Place();
		this.study_admin_list();
	}

	ngOnInit(){
		this.page.init();
		let objSave = this;
		$('#newStudy').modal({
			complete: function(){
				objSave.placeState = 'close';
				objSave.placeList = [];
				objSave.placeOne = new Place();
				objSave.newStudy = new Study();
			}
		});
		$('#modiStudy').modal({
			complete: function(){
				objSave.placeState = 'close';
				objSave.placeList = [];
				objSave.placeOne = new Place();
				objSave.tempStudy = new Study();
			}
		});

		this.newMap = new naver.maps.Map('map', {
			center: new naver.maps.LatLng(37.3595704, 127.105399),
			zoom: 11
		});
		this.modiMap = new naver.maps.Map('modiMap', {
			center: new naver.maps.LatLng(37.3595704, 127.105399),
			zoom: 11
		});
	}
	study_create(getStudy, getPlace){
		getStudy.admin = this.userInfo.idx;
		let input = {
			study : getStudy,
			place : getPlace
		}
		this.studyService.studyNew(input).subscribe(
			data =>{
				(data.msg == 'done') ? alert('등록되었습니다.') : alert('등록중 문제가 생겼습니다.')
				this.close_new_modal();
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
		this.studyService.studyModify(input).subscribe(
			data => {
				(data.msg == 'done') ? alert('등록되었습니다.') : alert('등록중 문제가 생겼습니다.')
				this.close_modi_modal();
				this.study_admin_list();
				this.newStudy = new Study();
			}
		)
	}
	study_admin_list(){
		this.studyService.studyAdminList().subscribe(
			data =>{
				(data.msg == 'no_res') ? this.studyList = [] : this.studyList = data;
			},
			error => console.log(error)
		)
	}
	study_join_list(){
		
	}
	open_new_modal(){
		$('#newStudy').modal('open');
	}
	open_modi_modal(input){
		$('#modiStudy').modal('open');
		this.studyService.studyOne(input).subscribe(
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
		this.placeService.getPlaceList(input).subscribe(
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
	close_new_modal(){
		$('#newStudy').modal('close');
	}
	close_modi_modal(){
		$('#modiStudy').modal('close');
	}
	move_search(){
		this.router.navigate(['/userpage/stdSearch']);
	}
	move_study(input){
		this.studyService.studyEnter(input).subscribe(
			data => console.log(data)
		)
		this.router.navigate(['/study']);
	}
	toggleSearcher(){
		this.placeState = this.placeState == 'open' ? 'close' : 'open';
	}
	toggleModiSearcher(){
		this.placeModiState = this.placeModiState == 'open' ? 'close' : 'open';
	}
	place_search(input){
		this.placeService.placeSearch(input).subscribe(
			data=> {
				for(let mark of this.markerList){
					mark.setMap(null);
				}
				this.markerList = [];

				for(let item of data.items){
					this.markerList.push(
						new naver.maps.Marker({
							position: naver.maps.TransCoord.fromTM128ToLatLng({x : item.mapx, y: item.mapy}),
							map: this.newMap
					}));
				}
				for(let i=0; i<this.markerList.length; i++){
					let newMap = this.newMap;
					let marker_item = this.markerList[i];
					let item = data.items[i];
					let place = this.placeOne;

					let infoWindow = new naver.maps.InfoWindow({
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
					naver.maps.Event.addListener(marker_item, 'click', function(e){
						place.name = item.title.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
						place.mapx = marker_item.getPosition().x;
						place.mapy = marker_item.getPosition().y;
						if(infoWindow.getMap()){
							infoWindow.close();
						}else{
							infoWindow.open(newMap, marker_item);
						}
					});
				}
				this.newMap.setCenter(naver.maps.TransCoord.fromTM128ToLatLng({x : data.items[0].mapx,y : data.items[0].mapy}));
			}
		)
	}
	place_modi_search(input){
		this.placeService.placeSearch(input).subscribe(
			data=> {
				for(let mark of this.markerList){
					mark.setMap(null);
				}
				this.markerList = [];

				for(let item of data.items){
					this.markerList.push(
						new naver.maps.Marker({
							position: naver.maps.TransCoord.fromTM128ToLatLng({x : item.mapx, y: item.mapy}),
							map: this.modiMap
					}));
				}
				for(let i=0; i<this.markerList.length; i++){
					let modiMap = this.modiMap;
					let marker_item = this.markerList[i];
					let item = data.items[i];
					let place = this.placeOne;

					let infoWindow = new naver.maps.InfoWindow({
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
					naver.maps.Event.addListener(marker_item, 'click', function(e){
						place.name = item.title.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
						place.mapx = marker_item.getPosition().x;
						place.mapy = marker_item.getPosition().y;
						if(infoWindow.getMap()){
							infoWindow.close();
						}else{
							infoWindow.open(modiMap, marker_item);
						}
					});
				}
				this.modiMap.setCenter(naver.maps.TransCoord.fromTM128ToLatLng({x : data.items[0].mapx,y : data.items[0].mapy}));
			}
		)
	}

	place_insert(input){
		let placeTemp = Object.assign({}, input);
		this.placeList.push(placeTemp);
		this.placeOne = new Place();
		if(this.placeList.length >= 3){
			this.placeState = 'close';
			this.placeModiState = 'close';
		}
	}
	place_remove(input, num){
		console.log(input);
		if(input.idx){
			this.placeService.placeRemove(input.idx).subscribe(
				data => {
					if(data.msg != 'done'){
						console.log(data);
						alert('서버 오류가 생겼습니다.');
					}
				}
			)
		}
		this.placeList.splice(num, 1);
	}
	// showPlaceInfo(input){
	// 	console.log(input);
	// 	this.placeOne = input;

	// }
	// showModiPlaceInfo(input){
	// 	console.log(input);
	// 	this.placeOne = input;
	// 	console.log(this.placeOne);
		
	// 	for(let mark of this.markerList){
	// 		mark.setMap(null);
	// 	}
	// 	this.markerList = [];

	// 	this.markerList.push(
	// 		new naver.maps.Marker({
	// 			position: naver.maps.TransCoord.fromTM128ToLatLng({x : this.placeOne.mapx, y: this.placeOne.mapy}),
	// 			map: this.modiMap
	// 	}));
		
	// 	this.modiMap.setCenter(naver.maps.TransCoord.fromTM128ToLatLng({x : this.placeOne.mapx,y : this.placeOne.mapy}));
	// 	this.placeModiState = 'open';
			
	// }

	doPromise(input:any){
		return new Promise(function(resolve, reject){
			resolve(input);
		});
	}

}
