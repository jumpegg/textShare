import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { User } from '../vo/user';
import { Study } from '../vo/study';

@Injectable()
export class UserService{
    private header:Headers;

    constructor(private http:Http){
        let header = new Headers({'Content-Type':'application/json'});
    }
    userInsert(input:User){
        return this.http.post('/user/user_join', input, {headers:this.header})
            .map(res=>res.json());
    }
    userLogin(input:User){
        return this.http.post('/user/user_login', input, {headers:this.header})
            .map(res => res.json());
    }
    userTest(){
        return this.http.get('/user/user_test', {headers:this.header})
            .map(res => res.json());
    }
    chkSess(){
        return this.http.get('/user/sess', {headers:this.header});
    }
    userInfo(){
        return this.http.get('/user/user_info', {headers:this.header})
            .map(res => res.json());
    }
    studyNew(input){
        return this.http.post('/user/study_new', input, {headers:this.header})
            .map(res=>res.json());
    }
    studyJoin(input){
        return this.http.post('/user/study_join', input, {headers:this.header})
            .map(res => res.json());
    }
    studyList(input){
        return this.http.post('/user/study_search', input, {headers:this.header})
            .map(res => res.json());
    }
    studyAdminList(){
        return this.http.get('/user/study_admin', {headers:this.header})
            .map(res => res.json());
    }
}
