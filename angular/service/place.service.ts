import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { Place } from '../vo/place';

@Injectable()
export class PlaceService{
	private header:Headers;

	constructor(private http:Http){
		let header = new Headers({'Content-Type':'application/json'});
	}

	/* place 관련 함수들
		placeSearch: 장소명, 건물명 검색
		placeInsert: 장소 등록
		getPlaceList: 등록된 장소 리스트 가져오기
	 */
	placeSearch(input){
		return this.http.get('/user/study_search_place/'+ input, {headers:this.header})
			.map(res => res.json());
	}
	placeInsert(input){
		return this.http.post('/user/place_new', input, {headers:this.header})
			.map(res => res.json());
	}
	placeRemove(input){
		return this.http.get('/user/place_remove/'+input, {headers:this.header})
			.map(res => res.json());
	}
	getPlaceList(input){
		return this.http.get('/user/place_list/'+input, {headers:this.header})
			.map(res => res.json());
	}
	
}