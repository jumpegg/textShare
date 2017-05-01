import {Component, OnInit} from '@angular/core';

import {PageInfo} from '../../../service/single_info';

@Component({
	selector: 'index',
	templateUrl: 'client/component/userpage/index/userindex.component.html'
})
export class UserIndexComponent {
	private title: string;
	constructor(public page:PageInfo){
		this.title = "this is user index";
	}

	ngOnInit(){
		this.page.init();
	}
}
