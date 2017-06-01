import { Injectable } from '@angular/core';
import {
	CanActivate, Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { StudyService } from '../service/study.service';

@Injectable()
export class PermissionGuard implements CanActivate{
	constructor(
		private studyService:StudyService,
		private router: Router
		){}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
		return this.studyService
		.studyPermissionChk()
		.map(
			data=>{
				if(data.msg < 5){
					return true;
				}else{
					alert('권한이 없습니다.');
					return false;
				}
			}
		)
	}


}
