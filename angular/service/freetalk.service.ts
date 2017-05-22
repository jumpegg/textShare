import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { Freetalk } from '../vo/freetalk';

@Injectable()
export class FreetalkService{
	private header:Headers;

	constructor(private http:Http){
		this.header = new Headers({'Content-Type':'application/json'});
	}

	create(input){
		return this.http.post('/study/new_freetalk', input, {headers:this.header})
			.map(res=>res.json());
	}
	getCnt(){
		return this.http.get('/study/getCnt_freetalk', {headers:this.header})
			.map(res=>res.json());
	}
	list(){
		return this.http.get('/study/list_freetalk', {headers:this.header})
			.map(res=>res.json());
	}
	pagingList(input){
		return this.http.get('/study/paging_freetalk/'+input, {headers:this.header})
			.map(res=>res.json());
	}
	getOne(input){
		return this.http.get('/study/getOne_freetalk/'+input, {headers:this.header})
			.map(res=>res.json());
	}
	update(input){
		return this.http.post('/study/update_freetalk', input, {headers:this.header})
			.map(res=>res.json());
	}
	delete(input){
		return this.http.get('/study/delete_freetalk/'+input, {headers:this.header})
			.map(res=>res.json());
	}
	forIndex(){
		return this.http.get('/study/getIndex_freetalk', {headers:this.header})
			.map(res=>res.json());
	}
}