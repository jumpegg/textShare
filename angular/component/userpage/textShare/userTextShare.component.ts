import { Component, OnInit } from '@angular/core';
// import { TreeModule } from 'tree-component';
import {PageInfo} from '../../../service/single_info';
import {UserInfo} from '../../../service/single_user';

declare var $ : any;

@Component({
	styleUrls: ['client/component/userpage/textShare/userTextShare.component.css'],
	templateUrl: 'client/component/userpage/textShare/userTextShare.component.html'
})
export class UserTextShareComponent{

	private title:string;
  //   public nodes = [
  //   {
  //     id: 1,
  //     name: 'root1',
  //     children: [
  //       { id: 2, name: 'child1' },
  //       { id: 3, name: 'child2' }
  //     ]
  //   },
  //   {
  //     id: 4,
  //     name: 'root2',
  //     children: [
  //       { id: 5, name: 'child2.1' },
  //       {
  //         id: 6,
  //         name: 'child2.2',
  //         children: [
  //           { id: 7, name: 'subsub' }
  //         ]
  //       }
  //     ]
  //   }
  // ];
	constructor(public page:PageInfo,public userInfo:UserInfo){
	}
	ngOnInit(){
		// $('.scrollbar-outer').scrollbar();
		// $('.scrollbar-inner').scrollbar();
		// $('.scroll').optiscroll();
		$('.scrollbar-outer').scrollbar();

		this.page.setUrl();
		this.page.title = "TextShare";
		this.page.tabList =[
			{
				name : 'TextShare',
				link : 'textShare'
			},
			{
				name : 'TextBag',
				link : 'textBag'
			}
		];
	}
}
