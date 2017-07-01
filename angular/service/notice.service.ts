import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { Notice } from '../vo/notice';

@Injectable()
export class NoticeService{
	private header:Headers;

	constructor(private http:Http){
		this.header = new Headers({'Content-Type':'application/json'});
	}

	create(input){
		return this.http.post('/study/notice', input, {headers:this.header})
			.map(res=>res.json());
	}
	getCnt(){
		return this.http.get('/study/getCnt_notice', {headers:this.header})
			.map(res=>res.json());
	}
	list(){
		return this.http.get('/study/list_notice', {headers:this.header})
			.map(res=>res.json());
	}
	pagingList(input){
		return this.http.get('/study/paging_notice/'+input, {headers:this.header})
			.map(res=>res.json());
	}
	getOne(input){
		return this.http.get('/study/getOne_notice/'+input, {headers:this.header})
			.map(res=>res.json());
	}
	update(input){
		return this.http.put('/study/notice', input, {headers:this.header})
			.map(res=>res.json());
	}
	delete(input){
		return this.http.delete('/study/notice/'+input, {headers:this.header})
			.map(res=>res.json());
	}
	forIndex(){
		return this.http.get('/study/getIndex_notice', {headers:this.header})
			.map(res=>res.json());
	}
}