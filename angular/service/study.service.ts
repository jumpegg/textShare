import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { Study } from '../vo/study';

@Injectable()
export class StudyService{
    private header:Headers;

    constructor(private http:Http){
        let header = new Headers({'Content-Type':'application/json'});
    }
    callMap(){
        return this.http.get('/study/map', {headers: this.header});
    }
	

}
