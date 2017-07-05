import { Component, OnInit } from '@angular/core';

import { PageInfo } from '../../../global/single_info';
import { UserInfo } from '../../../global/single_user';
import { fadeInAnimation } from '../../animation/fadein';

@Component({
	templateUrl: 'client/component/userpage/mypage/userMyPage.component.html',
	styleUrls: ['client/component/userpage/mypage/userMyPage.component.css'],
	animations: [fadeInAnimation]
})
export class UserMyPageComponent implements OnInit{

	private pageState:Boolean = false;
	constructor(
		public page:PageInfo, 
		public userInfo:UserInfo){
	}

	ngOnInit(){
		this.page.init();
		this.pageState = true;
	}
}
