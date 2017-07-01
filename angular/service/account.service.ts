import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';

import { Account } from '../vo/account';
import { Acc_info } from '../vo/acc_info';
import { Acc_user } from '../vo/acc_user';

@Injectable()
export class AccountService{
	private header:Headers;

	constructor(private http:Http){
		this.header = new Headers({'Content-Type':'application/json'});
	}
	// create
	accCreate(input){
		return this.http.post('/study/account', input,{headers:this.header})
			.map(res=>res.json());
	}
	infoCreate(input){
		return this.http.post('/study/acc_info', input, {headers:this.header})
			.map(res=>res.json());
	}
	userCreate(input){
		return this.http.post('/study/acc_user', input, {headers:this.header})
			.map(res=>res.json());
	}
	// list
	accList(){
		return this.http.get('/study/list_account', {headers:this.header})
			.map(res=>res.json());
	}
	infoList(input){
		return this.http.get('/study/list_acc_info/'+input, {headers:this.header})
			.map(res=>res.json());
	}
	userList(input){
		return this.http.get('/study/list_acc_user/'+input, {headers:this.header})
			.map(res=>res.json());
	}
	accGetOne(input){
		return this.http.get('/study/getOne_account/'+input, {headers:this.header})
			.map(res=>res.json());
	}
	accGetLastOne(){
		return this.http.get('/study/list_acc_get_last', {headers:this.header})
			.map(res=>res.json());
	}
	// update
	accUpdate(input){
		return this.http.put('/study/account', input, {headers:this.header})
			.map(res=>res.json());
	}
	userUpdate(input){
		return this.http.put('/study/acc_user', input, {headers:this.header})
			.map(res=>res.json());
	}
	// delete
	infoDelete(input){
		return this.http.delete('/study/acc_info/'+input, {headers:this.header})
			.map(res=>res.json());
	}
	userDelete(input){
		return this.http.delete('/study/acc_user/'+input, {headers:this.header})
			.map(res=>res.json());
	}
}