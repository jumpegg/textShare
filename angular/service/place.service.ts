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

	getPlaceList(input){
		return this.http.get('/user/place_list/'+input, {headers:this.header})
			.map(res => res.json());
	}
}