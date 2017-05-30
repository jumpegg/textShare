import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { StudyInfo } from '../global/single_study';

@Injectable()
export class StudyPageInfo{
		public tabList: any[];
		public url:string;
		public title:string = "title test";
		public need:boolean;
		public geturl:string;
		
	init(){
		if(this.url == 'schedule' || this.url == 'scheduleNew' || this.url == 'account' || this.url == 'admin'){
			this.need = false;
			this.title = '운영';
			this.tabList = [
				{
					name : 'Schedule',
					link : 'schedule'
				},
				{
					name : 'Account',
					link : 'account'
				},
				{
					name : 'Members',
					link : 'admin'
				}
			];
		}else if(this.url == 'freetalk' || this.url == 'notice'){
			this.need = false;
			this.title = '게시판';
			this.tabList = [
				{
					name : '공지사항',
					link : 'notice'
				},
				{
					name : '자유게시판',
					link: 'freetalk'
				}
			];
		}else if(this.url == 'flow' || this.url == 'data'){
			this.need = false;
			this.title = "자료실";
			this.tabList = [
				{
					name : 'Flow',
					link : 'flow'
				},
				{
					name : 'Data',
					link: 'data'
				}
			];
		}else{
			// console.log('else called');
			this.need = true;
			this.title = this.url.toUpperCase();
			this.tabList = [
				{
					name : '',
					link : ''
				}
			];
		}
	}

}