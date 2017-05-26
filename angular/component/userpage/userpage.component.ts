import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../service/user.service';
import {PageInfo} from '../../global/single_info';

declare var $ : any;
@Component({
	selector: 'userpage',
	templateUrl: 'client/component/userpage/userpage.component.html',
	styleUrls: ['client/component/userpage/userpage.component.css'],
	providers: [ UserService ]
})
export class UserpageComponent {
	public id:string;
	public test:Object;

	constructor(
		private userService:UserService, 
		private route:ActivatedRoute, 
		public page:PageInfo){
		this.userService.chkSess().subscribe(
			data => {},
			error => console.log(error)
		)
	}
	ngOnInit(){
		this.test = this.route.snapshot.data['userResolve'];
		let urlList = document.location.hash.split('/');
		let params = urlList[urlList.length - 1].split('?');
		let url = params[0];
		this.page.url = url;
		// console.log(this.url);
		$(".button-collapse").sideNav({
			edge: 'right'
		});
		// $('ul.tabs').tabs(); 
	}
	

}
