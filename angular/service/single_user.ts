import { Injectable } from '@angular/core';

@Injectable()
export class UserInfo{
    public idx:string;
    public id:string;
    public email:string;
    public phone:string;
    public addr:string;
    public intro:string;
    public c_date:Date;
}