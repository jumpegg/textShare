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
    studyNew(input){
        return this.http.post('/study/study_new', input, {headers:this.header})
            .map(res=>res.json());
    }
    studyJoin(input){
        return this.http.post('/study/study_join', input, {headers:this.header})
            .map(res => res.json());
    }
    studyList(input){
        return this.http.post('/study/study_search', input, {headers:this.header})
            .map(res => res.json());
    }
    studyAdminList(){
        return this.http.get('/study/study_admin', {headers:this.header})
            .map(res => res.json());
    }
}
