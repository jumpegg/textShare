import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { User } from '../../vo/user';
import { UserService } from '../../service/user.service';
import { Vali } from '../../global/single_vali';
import { fadeInAnimation } from '../animation/fadein';

declare var $ : any;
@Component({
	selector:'index',
	templateUrl: 'client/component/index/index.component.html',
	styleUrls: ['client/component/index/index.component.css'],
	providers: [UserService],
	animations: [fadeInAnimation]
})
export class IndexComponent implements OnInit{
	private title:String;
	private user:User;
	private joiner:User;
	private chk_dupl:boolean = false;
	private control:FormControl;
	private tempId:string = "";
	private pageState:Boolean = true;

	constructor(
		private userService:UserService,
		private vali:Vali,
		private router:Router){
		this.title = "Index Page";
		this.user = new User();
		this.joiner = new User();
		this.control = new FormControl('', [Validators.required]);
	}
	ngOnInit(){
		$('.collapsible').collapsible();
		$('#SignUp').modal();
	}
	login(input){
		let isTrue = true;
		Object.keys(input).map(key=>{
			isTrue = isTrue && input[key];
		});
		if(isTrue){
			this.userService.userLogin(this.user).subscribe(
				data => {
					if(data.msg == "no_res"){
						alert('아이디, 비밀번호를 확인해주세요');
						return false;
					}else if(data == true){
						this.pageState = false;
						this.router.navigate(['/userpage']);
					}else if(data == false){
						alert('아이디, 비밀번호를 확인해주세요');
					}
				},
				error => alert(error)
			);
		}else{
			alert('올바른 값을 입력해주세요');
		}
	}
	join(input){
		let isTrue = true;
		Object.keys(input).map(key=>{
			isTrue = isTrue && input[key];
		});
		if(this.joiner.id != this.tempId){
			this.chk_dupl = false;
		}
		if(isTrue && this.chk_dupl){
			this.userService
			.userInsert(this.joiner)
			.subscribe(
				data => {
					if(data.msg=='done'){
						alert('가입되었습니다.');
						this.joiner = new User();
						this.close_modal();
					}else{
						alert('가입도중 문제가 발생했습니다.');
					}
				},
				error => {
					alert('가입도중 문제가 발생했습니다.');
				}
			)
		}else{
			if(!isTrue){
				alert('올바른 값을 입력해주세요.');
			}else if(!this.chk_dupl){
				alert('아이디 중복 확인을 눌러주세요.');
			}
		}
	}
	user_chk(){
		if(this.joiner.id){
			this.userService.userTest(this.joiner)
			.subscribe(
				data => {
					if(data.msg == 'no_res'){
						alert('사용 가능한 아이디 입니다.');
						this.tempId = this.joiner.id;
						this.chk_dupl = true;
					}else if(data.msg == 'using_id'){
						alert('사용중인 아이디 입니다.');
					}
				},
				error => console.log(error)
			)
		}else{
			alert('아이디를 입력해주세요');
		}
	}
	open_modal(){
		$('#SignUp').modal('open');
	}
	close_modal(){
		$('#SignUp').modal('close');
	}

}