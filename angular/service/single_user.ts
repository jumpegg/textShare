import { Injectable } from '@angular/core';

@Injectable()
export class UserInfo{
    public idx:number;
    public id:number;
    public email:string;
    public phone:string;
    public addr:string;
    public intro:string;
    public c_date:Date;
}