import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { TextShare } from '../vo/textshare';

@Injectable()
export class TextShareService{
	private header:Headers;

	constructor(private http:Http){
		let header = new Headers({'Content-Type':'application/json'});
	}

	tsInsert(input:TextShare){
		return this.http.post('/user/ts_create', input, {headers:this.header})
			.map(res=>res.json());
	}
	tsRead(input:number){
		return this.http.get('/user/ts_selectOne/'+input, {headers:this.header})
			.map(res=>res.json());
	}
	tsUpdate(input){
		return this.http.post('/user/ts_update', input, {headers:this.header})
			.map(res=>res.json());
	}
}