import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { User } from '../../vo/user';
import { UserService } from '../../service/user.service';
// import { AuthGuard } from '../../service/auth-guard.service';

@Component({
    selector:'index',
    templateUrl: 'client/component/index/index.component.html',
    styleUrls: ['client/component/index/index.component.css'],
    providers: [UserService]
})
export class IndexComponent{
    private title:String;
    private user:User;
    private joiner:User;
    joinForm = new FormGroup({
        joinId : new FormControl('',Validators.compose([Validators.required])),
        joinPass : new FormControl('',Validators.compose([Validators.required])),
        joinEmail : new FormControl('',Validators.compose([Validators.required]))
    });

    constructor(private userService:UserService, private router:Router){
        this.title = "Index Page";
        this.user = new User();
        this.joiner = new User();
    }
    login(input){
        this.userService.userLogin(input).subscribe(
            data => {
                if(data.msg == "no_res"){
                    alert('아이디, 비밀번호를 확인해주세요');
                    return false;
                }else if(data == true){
                    this.router.navigate(['/userpage']);
                }else if(data == false){
                    alert('아이디, 비밀번호를 확인해주세요');
                }
            },
            error => alert(error)
        );
    }
    join(input){
        this.userService.userInsert(input).subscribe(
            data => {
                (data.msg == 'done') ? alert('가입되었습니다!') : alert('가입도중 문제가 발생했습니다.');
            },
            error => {
                alert('가입도중 문제가 발생했습니다.');
            }
        )
    }
    user_test(){
        this.userService.userTest().subscribe(
            data => console.log(data.output),
            error => console.log(error)
        )
    }
}
