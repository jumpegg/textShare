import { Component } from '@angular/core';

@Component({
	templateUrl: 'client/component/userpage/userStudyJoin/userSTDJoin.component.html',
	styleUrls: ['client/component/userpage/userStudyJoin/userSTDJoin.component.css']
})
export class UserSTDJoinComponent{
	private title:string;
	constructor(){
		this.title = "this is STDJoin";
	}
}
