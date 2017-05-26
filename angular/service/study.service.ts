import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { Study } from '../vo/study';

@Injectable()
export class StudyService{
	private header:Headers;

	constructor(private http:Http){
		this.header = new Headers({'Content-Type':'application/json'});
	}
	callMap(){
		return this.http.get('/study/map', {headers: this.header});
	}
	/* study 관련 함수들 
		studyNew: 스터디 생성
		studyJoin: 스터디 가입
		studyList: 스터디 검색 결과 리스트
		studyAdminList: 현재 관리중인 스터디 리스트
	*/
	studyEnter(input){
		return this.http.get('/user/study_enter/'+input, {headers:this.header})
			.map(res=>res.json());
	}
	studySet(){
		return this.http.get('/user/study_set', {headers:this.header})
			.map(res=>res.json());
	}
	studyNew(input){
		return this.http.post('/user/study_new', input, {headers:this.header})
			.map(res=>res.json());
	}
	studyModify(input){
		return this.http.post('/user/study_modify', input, {headers:this.header})
			.map(res=>res.json());
	}
	studyOne(input){
		return this.http.get('/user/study_getOne/'+input, {headers: this.header})
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
	studyLatest(){
		return this.http.get('/user/latest', {headers:this.header})
			.map(res => res.json());
	}
	isUserStudy(){
		return this.http.get('/user/isUserStudy', {headers:this.header})
	}
	studyTextSearch(input){
		return this.http.post('/user/text_search', input, {headers:this.header})
			.map(res => res.json());
	}
}
