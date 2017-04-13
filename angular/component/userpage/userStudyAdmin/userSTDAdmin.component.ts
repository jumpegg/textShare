import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Study } from '../../../vo/study';
import { StudyService } from '../../../service/study.service';

@Component({
    templateUrl: 'client/component/userpage/userStudyAdmin/userSTDAdmin.component.html',
    styleUrls: ['client/component/userpage/userStudyAdmin/userSTDAdmin.component.css'],
    providers: [StudyService]
})
export class UserSTDAdminComponent{
    private newStudy: Study;
    private studyList: Study[];
    public mydata:Object;
    newStudyForm = new FormGroup({
        newStudyNameVali : new FormControl('', Validators.compose([Validators.required])),
        newStudyInfoVali : new FormControl('', Validators.compose([Validators.required]))
    });

    constructor(private studyService:StudyService, private router:Router, private route:ActivatedRoute){
        this.newStudy = new Study();
        this.study_admin_list();
    }
    ngOnInit(){
        this.mydata = this.route.snapshot.data['userResolve'];
        // console.log(this.mydata.idx);
    }
    study_create(input){
        input.admin = this.mydata.idx;
        this.studyService.studyNew(input).subscribe(
            data =>(data.msg == 'done') ? alert('등록되었습니다.') : alert('등록중 문제가 생겼습니다.'),
            error => console.log(error)
        )
    }
    study_admin_list(){
        this.studyService.studyAdminList().subscribe(
            data =>{
                (data.msg == 'no_res') ? this.studyList = [] : this.studyList = data;
                // console.log(this.studyList);
            },
            error => console.log(error)
        )
    }
}
