import { Injectable } from '@angular/core';
import {
	CanActivate, Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';
import "rxjs/add/operator/map";
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { UserInfo } from '../service/single_user';

@Injectable()
export class AuthGuard implements CanActivate{
	constructor(private userService:UserService, private router: Router, public userInfo:UserInfo){}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
		return this.userService.chkSess().map(
			res => {
				if(res.json()){
					this.userService.userInfo().subscribe(
						data => {
							this.userInfo.id = data.id;
							this.userInfo.email = data.email;
							this.userInfo.phone = data.phone;
							this.userInfo.addr = data.addr;
							this.userInfo.intro = data.intro;
							this.userInfo.idx = data.idx;
							this.userInfo.c_date = data.c_date;
						},
						error => console.log(error)
					);
					return true;
				}else{
					alert("잘못된 접근입니다.");
					this.router.navigate(['/index']);
					return false;
				}
			},
			error =>{
				console.log(error);
			}
		)
	}
	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
		return this.canActivate(route, state);
	}

}
