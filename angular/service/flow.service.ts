import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { Flow } from '../vo/flow';

@Injectable()
export class FlowService{
	private header:Headers;

	constructor(private http:Http){
		this.header = new Headers({'Content-Type':'application/json'});
	}

	create(input){
		return this.http.post('/study/new_flow', input, {headers:this.header})
			.map(res=>res.json());
	}
	list(){
		return this.http.get('/study/list_flow', {headers:this.header})
			.map(res=>res.json());
	}
	getOne(input){
		return this.http.get('/study/getOne_flow/'+input, {headers:this.header})
			.map(res=>res.json());
	}
	update(input){
		return this.http.post('/study/update_flow', input, {headers:this.header})
			.map(res=>res.json());
	}
	delete(input){
		return this.http.get('/study/delete_flow/'+input, {headers:this.header})
			.map(res=>res.json());
	}
}