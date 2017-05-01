import { Component, OnInit } from '@angular/core';
// import { TreeModule } from 'tree-component';
import {PageInfo} from '../../../service/single_info';
import {UserInfo} from '../../../service/single_user';
import {trigger, state, style, animate, transition} from '@angular/animations';

declare var $ : any;

@Component({
	styleUrls: ['client/component/userpage/textShare/userTextShare.component.css'],
	templateUrl: 'client/component/userpage/textShare/userTextShare.component.html',
	animations: [
		trigger('aniState',[
			state('open', style({
			})),
			state('close',style({
				height: '0px'
			})),
			transition('open => close', animate('100ms ease-in')),
			transition('close => open', animate('100ms ease-out'))
		])
	]
})
export class UserTextShareComponent{

	private title:string;
	private aniStateVal:string = "open";

	constructor(public page:PageInfo,public userInfo:UserInfo){
	}
	ngOnInit(){
		$('.scrollbar-outer').scrollbar();
		this.page.init();
	}

	aniToggle(){
		console.log(this.aniStateVal);
		if(this.aniStateVal == 'open'){
			this.aniStateVal = 'close';
		}else{
			this.aniStateVal = 'open';
		}
	}
}
