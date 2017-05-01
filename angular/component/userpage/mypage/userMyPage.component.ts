import { Component, OnInit } from '@angular/core';

import {PageInfo} from '../../../service/single_info';
import {UserInfo} from '../../../service/single_user';

@Component({
	templateUrl: 'client/component/userpage/mypage/userMyPage.component.html',
	styleUrls: ['client/component/userpage/mypage/userMyPage.component.css']
})
export class UserMyPageComponent implements OnInit{
	constructor(public page:PageInfo, public userInfo:UserInfo){
	}

	ngOnInit(){
		this.page.init();
	}
}
