import { Component, OnInit } from '@angular/core';
import {PageInfo} from '../../../service/single_info';

@Component({
	templateUrl: 'client/component/userpage/userStudySearch/userSTDSearch.component.html',
	styleUrls: ['client/component/userpage/userStudySearch/userSTDSearch.component.css']
})
export class UserSTDSearchComponent{
	private title:string;
	constructor(public page:PageInfo){
		this.title = "this is STDSearch";
	}

	ngOnInit(){
		this.page.setUrl();
		this.page.title = "Hello TextShare";
		this.page.tabList = [
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
