import { Injectable } from '@angular/core';
import {
	CanActivate, Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';
import "rxjs/add/operator/map";
import { UserService } from '../service/user.service';
import { MemberService } from '../service/member.service';
import { StudyService } from '../service/study.service';
import { Observable } from 'rxjs/Observable';
import { UserInfo } from '../global/single_user';
import { PageInfo } from '../global/single_info';
import { StudyInfo } from '../global/single_study';

@Injectable()
export class StudyGuard implements CanActivate{
	constructor(
		private userService:UserService,
		private studyService:StudyService,
		private memberService:MemberService,
		private router: Router,
		private userInfo:UserInfo,
		private studyInfo:StudyInfo,
		private pageInfo:PageInfo
	){}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
		return this.studyService.isUserStudy().map(
			data => {
				if(data.json()){
					return true;
				}else{
					alert("잘못된 접근입니다.");
					this.router.navigate(['/userpage']);
					return false;
				}
			}
		)
	}

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean{
		console.log(route.url[0].path);
		if(route.url[0].path == 'index'){
			return true;
		}else{
			return this.memberService
							.isMember()
							.map(
								data=>{
									if(data.msg == 'member'){
										return true;
									}else if(data.msg == 'hoper'){
										alert('스터디장이 회원 가입을 확인중 입니다.');
										this.router.navigate(['/study/index']);
										return false;
									}else if(data.msg == 'guest'){
										alert('회원 가입 후 이용해주세요.');
										this.router.navigate(['/study/index']);
										return false;
									}else{
										alert('error');
										this.router.navigate(['/userpage']);
										return false;
									}
								}
							)
		}
	}
}
