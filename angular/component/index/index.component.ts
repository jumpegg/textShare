import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { User } from '../../vo/user';
import { UserService } from '../../service/user.service';

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
                if(data.idx == "no_user"){
                    alert('존재하지 않는 사용자 입니다.');
                    return false;
                }else{
                    this.router.navigate(['/userpage']);
                }
            },
            error => alert(error)
        );
    }
    join(input){
        this.userService.userInsert(input).subscribe(
            data => {
                if(data.mesg){
                    alert('가입되었습니다!');
                }else{
                    alert('가입도중 문제가 발생했습니다.');
                }
            },
            error =>{
                console.log(error);
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
