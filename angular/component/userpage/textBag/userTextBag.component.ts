import { Component, OnInit } from '@angular/core';
import {PageInfo} from '../../../global/single_info';
import {UserInfo} from '../../../global/single_user';

@Component({
	templateUrl: 'client/component/userpage/textBag/userTextBag.component.html'
})
export class UserTextBagComponent{
	private title:string;
	constructor(public page:PageInfo,public userInfo:UserInfo){
		this.title = "this is textBag";
	}
	ngOnInit(){
		this.page.init();
	}
}
