import { Injectable } from '@angular/core';

@Injectable()
export class Vali{
	isNull(input){
		if(!input){
			return true;
		}else{
			return (input.trim().length == 0) ? true : false;
		}
	}

	limitLen(num, input){
		if(!input){
			return true;
		}else{
			return (input.length > num) ? true : false;
		}
	}
}