import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { User } from '../vo/user';

@Injectable()
export class UserService{
    private header:Headers;

    constructor(private http:Http){
        let header = new Headers({'Content-Type':'application/json'});
    }

    userInsert(input:User){
        return this.http.post('/insert_user', input, {headers:this.header})
            .map(res=>res.json());
    }
    userLogin(input:User){
        return this.http.post('/user/user_login', input, {headers:this.header})
            .map(res => res.json());
    }
}
