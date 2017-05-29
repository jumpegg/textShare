import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StudyService } from '../../../service/study.service';
import { FreetalkService } from '../../../service/freetalk.service';
import { CommentService } from '../../../service/comment.service';
import { StudyPageInfo } from '../../../global/single_studypage';

import { Freetalk } from '../../../vo/freetalk';
import { Comment } from '../../../vo/comment';

@Component({
		styleUrls: ['client/component/study/freetalk/study_freetalk_read.component.css'],
		templateUrl: 'client/component/study/freetalk/study_freetalk_read.component.html',
		providers: [StudyService, FreetalkService, CommentService]
})
export class StudyReadFreetalk{
	public idx:number;
	public freetalk:Freetalk = new Freetalk();
	public new_comment:Comment = new Comment();
	public list_comment:any[] = [];
	constructor(
		public studyPage:StudyPageInfo,
		public freetalkService:FreetalkService,
		public commentService:CommentService,
		public router:Router,
		public route:ActivatedRoute
	){
		this.studyPage.init();
	}
	ngOnInit(){
		this.idx = +this.route.snapshot.params['idx'];
		this.freetalkService
		.getOne(this.idx)
		.subscribe(
			data=>{
				this.freetalk = data[0];
			}
		);
		this.comment_list();
	}
	comment_list(){
		this.commentService
		.list({freetalk_idx:this.idx})
		.subscribe(
			data=>{
				if(data.msg!='no_res'){
					this.list_comment = data;
				}
			}
		)
	}
	comment_submit(input){
		input.freetalk_idx = this.idx;
		this.commentService
		.create(input)
		.flatMap(
			data=>{
				console.log(data);
				if(data.msg=='done'){
					alert('등록되었습니다.');
					this.new_comment = new Comment();
				}else{
					alert('오류가 생겼습니다.');
				}
				return this.commentService.list({freetalk_idx:this.idx});
			}
		).subscribe(
			data=>{
				if(data.msg!='no_res'){
					this.list_comment = data;
				}
			}
		)
	}
	deleteFreetalk(input){
		if(confirm('삭제하시겠습니까?')){
			this.freetalkService
			.delete(input)
			.subscribe(
				data=>{
					if(data.msg == "done"){
						alert('삭제되었습니다.');
						this.router.navigate(['/study/freetalk']);
					}
				}
			)
		}
	}
}