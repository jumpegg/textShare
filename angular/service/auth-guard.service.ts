import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import "rxjs/add/operator/map";
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private userService:UserService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.userService.chkSess().map(
            res => {
                if(res.json()){
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
