import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class PageInfo{
		public tabList: any[];
		public url:string;
		public title:string = "title test";

	init(){
		console.log(this.url);
		let urlList = document.location.hash.split('/');
		let params = urlList[urlList.length - 1].split('?');
		this.url = params[0];

		if(this.url == 'textShare' || this.url == 'textBag' || this.url == 'textShareNew'){
			this.title = 'TextShare';
			this.tabList = [
				{
					name : 'TextShare',
					link : 'textShare'
				},
				{
					name : 'TextBag',
					link : 'textBag'
				}
			];
		}else if(this.url == 'mypage'){
			this.title = 'My Page';
				this.tabList = [
				{
					name : 'MyPage',
					link : 'mypage'
				}
			]
		}else if(this.url == 'stdAdmin' || this.url == 'stdSearch' || this.url == 'userpage'){
			this.title = "Hello TextShare";
			this.tabList = [
				{
					name : 'Study',
					link : 'stdAdmin'
				},
				{
					name : 'StudySearch',
					link: 'stdSearch'
				}

			]
		}
	}

}