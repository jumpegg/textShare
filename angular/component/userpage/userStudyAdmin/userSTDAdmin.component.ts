import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Study } from '../../../vo/study';
import { StudyService } from '../../../service/study.service';
import { UserService } from '../../../service/user.service';
import {PageInfo} from '../../../service/single_info';

declare var $ : any;
declare var naver : any;
@Component({
	templateUrl: 'client/component/userpage/userStudyAdmin/userSTDAdmin.component.html',
	styleUrls: ['client/component/userpage/userStudyAdmin/userSTDAdmin.component.css'],
	providers: [ UserService ]
})
export class UserSTDAdminComponent{
	private newStudy: Study;
	private studyList: Study[];
	public mydata:Object;
	public newMap:any;

	newStudyForm = new FormGroup({
		newStudyNameVali : new FormControl('', Validators.compose([Validators.required])),
		newStudyInfoVali : new FormControl('', Validators.compose([Validators.required]))
	});

	constructor(private userService:UserService, private router:Router, private route:ActivatedRoute, public page:PageInfo){
		this.newStudy = new Study();
		this.study_admin_list();
	}
	ngOnInit(){
		this.page.init();
		$('#newStudy').modal();
		$('#modiStudy').modal();

		this.newMap = new naver.maps.Map('map', {
			center: new naver.maps.LatLng(37.3595704, 127.105399),
			zoom: 11
		});
		// new naver.maps.Map('map', {
		// 	center: new naver.maps.LatLng(37.3595704, 127.105399)
		// });
	
	}
	study_create(input){
		input.admin = this.mydata.idx;
		this.userService.studyNew(input).subscribe(
			data =>(data.msg == 'done') ? alert('등록되었습니다.') : alert('등록중 문제가 생겼습니다.'),
			error => console.log(error)
		)
	}
	study_admin_list(){
		this.userService.studyAdminList().subscribe(
			data =>{
				(data.msg == 'no_res') ? this.studyList = [] : this.studyList = data;
				// console.log(this.studyList);
			},
			error => console.log(error)
		)
	}
	open_new_modal(){
		$('#newStudy').modal('open');
	}
	open_modi_modal(){
		$('#modiStudy').modal('open');
	}
	close_new_modal(){
		$('#newStudy').modal('close');
	}
	close_modi_modal(){
		$('#modiStudy').modal('close');
	}
	move_search(){
		this.router.navigate(['/userpage/stdSearch']);
	}
}
