import { Injectable } from '@angular/core';

@Injectable()
export class StudyInfo{
	public idx:number;
	public studyname:string;
	public info:string;
	public admin:number;
	public c_date:Date;
}