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

	create(){
		return this.http.get('/study/new_member', {headers:this.header})
			.map(res=>res.json());
	}
	getPermission(){
		return this.http.get('/study/get_permission', {headers:this.header})
			.map(res=>res.json());
	}
	setPermission(input){
		return this.http.post('/study/set_permission', input, {headers:this.header})
			.map(res=>res.json());
	}
	getUserInfo(){
		return this.http.get('/study/getUserInfo_member', {headers:this.header})
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
	isMember(){
		return this.http.get('/study/is_member', {headers:this.header})
			.map(res=>res.json());
	}
	allowMember(input){
		return this.http.post('/study/allow_member', input, {headers:this.header})
			.map(res=>res.json());
	}
	rejectMember(input){
		return this.http.post('/study/reject_member', input, {headers:this.header})
			.map(res=>res.json());
	}
}