import {Component} from '@angular/core';
import {UserInfo} from '../../service/userinfo.service';
import {UserService} from '../../service/user.service';

@Component({
    selector: 'userpage',
    templateUrl: 'client/component/userpage/userpage.component.html',
    styleUrls: ['client/component/userpage/userpage.component.css'],
    providers: [UserInfo, UserService]
})
export class UserpageComponent {
    constructor(public user:UserInfo, private userService:UserService){
        this.userService.chkSess().subscribe(
            data=>{this.user = data.json();},
            error=>{}
        )
    }
}
