import { Injectable } from '@angular/core';
import {
	CanActivate, Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';
import "rxjs/add/operator/map";
import { UserService } from './user.service';
import { StudyService } from './study.service';
import { Observable } from 'rxjs/Observable';
import { UserInfo } from '../service/single_user';
import { PageInfo } from '../service/single_info';
import { StudyInfo } from '../service/single_study';

@Injectable()
export class StudyGuard implements CanActivate{
	constructor(
		private userService:UserService,
		private studyService:StudyService,
		private router: Router,
		private userInfo:UserInfo,
		private studyInfo:StudyInfo,
		private pageInfo:PageInfo
	){}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
		return this.userService.chkSess().map(
			res => {
				let objSave = this;
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
						error => console.log(error),
						() => {
							objSave.studyService.studySet().subscribe(
								data2 => {
									objSave.studyInfo.idx = data2[0].idx;
									objSave.studyInfo.admin = data2[0].admin;
									objSave.studyInfo.studyname = data2[0].studyname;
									objSave.studyInfo.info = data2[0].info;
									objSave.studyInfo.c_date = data2[0].c_date;
								}
							)
						}
					);
					return true;
				}else{
					alert("잘못된 접근입니다.");
					this.router.navigate(['/userpage']);
					return false;
				}
			},
			error => console.log(error)
		)
	}
	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{
		// return true;
		return this.canActivate(route, state);
	}

}
