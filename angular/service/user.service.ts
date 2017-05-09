import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { User } from '../vo/user';
import { Study } from '../vo/study';

@Injectable()
export class UserService{
	private header:Headers;

	constructor(private http:Http){
		let header = new Headers({'Content-Type':'application/json'});
	}
	userInsert(input:User){
		return this.http.post('/user/user_join', input, {headers:this.header})
			.map(res=>res.json());
	}
	userLogin(input:User){
		return this.http.post('/user/user_login', input, {headers:this.header})
			.map(res => res.json());
	}
	userTest(){
		return this.http.get('/user/user_test', {headers:this.header})
			.map(res => res.json());
	}
	chkSess(){
		return this.http.get('/user/sess', {headers:this.header});
	}
	userInfo(){
		return this.http.get('/user/user_info', {headers:this.header})
			.map(res => res.json());
	}
	/* study 관련 함수들 
		studyNew: 스터디 생성
		studyJoin: 스터디 가입
		studyList: 스터디 검색 결과 리스트
		studyAdminList: 현재 관리중인 스터디 리스트
	*/
	studyNew(input){
		return this.http.post('/user/study_new', input, {headers:this.header})
			.map(res=>res.json());
	}
	studyJoin(input){
		return this.http.post('/user/study_join', input, {headers:this.header})
			.map(res => res.json());
	}
	studyList(input){
		return this.http.post('/user/study_search', input, {headers:this.header})
			.map(res => res.json());
	}
	studyAdminList(){
		return this.http.get('/user/study_admin', {headers:this.header})
			.map(res => res.json());
	}
	/* place 관련 함수들
		placeSearch: 장소명, 건물명 검색
		placeInsert: 장소 등록
		placeList: 등록된 장소 리스트 가져오기
	 */
	placeSearch(input){
		return this.http.get('/user/study_search_place/'+ input, {headers:this.header})
			.map(res => res.json());
	}
	placeInsert(input){
		return this.http.post('/user/place_new', input, {headers:this.header})
			.map(res => res.json());
	}
	placeList(input){
		return this.http.get('/user/place_list/'+input, {headers:this.header})
			.map(res => res.json());
	}
	/*
	 테스트용 함수들
	*/
	mapTest(){
		return this.http.get('/user/study_map_test', {headers:this.header})
			.map(res => res.json());
	}
}
