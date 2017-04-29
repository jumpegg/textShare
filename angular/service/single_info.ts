import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class PageInfo implements OnInit{
    public tabList: any[];
	public url:string;
    public title:string = "title test";

	setUrl(){
		let urlList = document.location.hash.split('/');
		let params = urlList[urlList.length - 1].split('?');
		this.url = params[0];
	}

	ngOnInit(){
		this.setUrl();
		console.log(this.url);
	}

}