import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
	private test:Object;
	private userInfo:any = {};

	constructor(
		private userService:UserService, 
		private route:ActivatedRoute, 
		private router:Router,
		private page:PageInfo){
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
		$(".button-collapse").sideNav({
			edge: 'right'
		});
		this.userService
		.userInfo()
		.subscribe(data=>{
			this.userInfo = data;
		})
	}

	logout(){
			this.userService
			.userLogout()
			.subscribe(
				data=>{
					if(data.msg=='logout_done'){
						this.router.navigate(['/']);
					}
				}
			)
		}
	

}
