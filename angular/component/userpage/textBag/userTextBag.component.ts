import { Component, OnInit } from '@angular/core';
import {PageInfo} from '../../../service/single_info';
import {UserInfo} from '../../../service/single_user';

@Component({
	templateUrl: 'client/component/userpage/textBag/userTextBag.component.html'
})
export class UserTextBagComponent{
	private title:string;
	constructor(public page:PageInfo,public userInfo:UserInfo){
		this.title = "this is mypage";
	}
	ngOnInit(){
		this.page.init();
	}
}
