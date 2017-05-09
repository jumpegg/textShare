import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Study } from '../../../vo/study';
import { Place } from '../../../vo/place';
import { StudyService } from '../../../service/study.service';
import { UserService } from '../../../service/user.service';
import { PlaceService } from '../../../service/place.service';
import { PageInfo } from '../../../service/single_info';
import { UserInfo } from '../../../service/single_user';

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
		])
	]
})
export class UserSTDAdminComponent{
	private newStudy:Study;
	private tempStudy:Study;
	private studyList:Study[];
	private joinList:Study[];
	private placeState:string = 'close';
	private search_input:string;
	private markerList:any[] = [];
	private placeList:any[] = [];
	private modiPlaceList:any[] = [];
	private placeOne:Place;
	private clickMarker:any;
	public mydata:Object;
	public newMap:any;

	newStudyForm = new FormGroup({
		newStudyNameVali : new FormControl('', Validators.compose([Validators.required])),
		newStudyInfoVali : new FormControl('', Validators.compose([Validators.required]))
	});

	constructor(
		private userService:UserService,
		private placeService:PlaceService,
		private router:Router, 
		private route:ActivatedRoute, 
		public page:PageInfo, 
		public userInfo:UserInfo){
		this.newStudy = new Study();
		this.placeOne = new Place();
		this.study_admin_list();
	}
	ngOnInit(){
		this.page.init();
		$('#newStudy').modal();
		$('#modiStudy').modal();

		this.newMap = new naver.maps.Map('map', {
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
		console.log(input);
		this.userService.studyNew(input).subscribe(
			data =>{
				console.log(data);
				(data.msg == 'done') ? alert('등록되었습니다.') : alert('등록중 문제가 생겼습니다.')
				this.close_new_modal();
				this.study_admin_list();
				this.newStudy = new Study();
			},
			error => console.log(error)
		)
	}
	study_admin_list(){
		this.userService.studyAdminList().subscribe(
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
		this.placeService.getPlaceList(input).subscribe(
			data => {
				if(data.msg != 'no_res'){
					this.placeList = data;
				}
				console.log(this.placeList);
			},
			error => console.log(error)
		)
	}
	close_new_modal(){
		$('#newStudy').modal('close');
		this.placeState = 'close';
	}
	close_modi_modal(){
		$('#modiStudy').modal('close');
		this.placeState = 'close';
	}
	move_search(){
		this.router.navigate(['/userpage/stdSearch']);
	}
	toggleSearcher(){
		this.placeState = this.placeState == 'open' ? 'close' : 'open';
	}
	place_search(input){
		this.userService.placeSearch(input).subscribe(
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
						place.map = marker_item.getPosition();
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

	place_insert(input){
		let placeTemp = Object.assign({}, input);
		this.placeList.push(placeTemp);
		console.log(this.placeList);
		if(this.placeList.length >= 3){
			this.placeState = 'close';
		}
	}
	doPromise(input:any){
		return new Promise(function(resolve, reject){
			resolve(input);
		});
	}

}
