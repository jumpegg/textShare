import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { Member } from '../vo/member';

@Injectable()
export class MemberService{
	private header:Headers;

	constructor(private http:Http){
		this.header = new Headers({'Content-Type':'application/json'});
	}

	create(input){
		return this.http.get('/study/new_member', {headers:this.header})
			.map(res=>res.json());
	}
	joinerList(){
		return this.http.get('/study/joiner_list_member', {headers:this.header})
			.map(res=>res.json());
	}
	hoperList(){
		return this.http.get('/study/hoper_list_member', {headers:this.header})
			.map(res=>res.json());
	}
}