import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService{
	private header:Headers;

	constructor(private http:Http){
		this.header = new Headers({'Content-Type':'application/json'});
	}

	createFolder(input){
		return this.http.post('/study/new_folder_data', input, {headers:this.header})
			.map(res=>res.json());
	}
	getStudyInfo(){
		return this.http.get('/study/getOne_study', {headers:this.header})
			.map(res=>res.json());
	}
	getFolderList(){
		return this.http.get('/study/list_folder_data', {headers:this.header})
			.map(res=>res.json());
	}
	isFile(input){
		return this.http.post('/study/is_file_data', input, {headers:this.header})
			.map(res=>res.json());
	}
	getFileList(input){
		return this.http.get('/study/list_file_data/'+input , {headers:this.header})
			.map(res=>res.json());
	}
}