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
		return this.studyService.isUserStudy().map(
			data => {
				if(data.json()){
					this.setUserInfo();
					this.setStudyInfo();
					return true;
				}else{
					alert("잘못된 접근입니다.");
					this.router.navigate(['/userpage']);
					return false;
				}
			}
		)
	}

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{
		return this.canActivate(route, state);
	}

	setUserInfo(){
		this.userService.userInfo().subscribe(
			data => {
				this.userInfo.id = data.id;
				this.userInfo.email = data.email;
				this.userInfo.phone = data.phone;
				this.userInfo.addr = data.addr;
				this.userInfo.intro = data.intro;
				this.userInfo.idx = data.idx;
				this.userInfo.c_date = data.c_date;
				this.setStudyInfo();
			},
			error => console.log(error),
		);
	}
	setStudyInfo(){
		this.studyService.studySet().subscribe(
			data => {
				if(data[0].idx){
					this.studyInfo.idx = data[0].idx;
					this.studyInfo.admin = data[0].admin;
					this.studyInfo.studyname = data[0].studyname;
					this.studyInfo.info = data[0].info;
					this.studyInfo.c_date = data[0].c_date;
				}else{
					alert("잘못된 접근입니다.");
					this.router.navigate(['/userpage']);
				}
			}
		)
	}
}
