import { RequestHandler } from 'express';
import { conn } from './connector';

export class Crud{
	private table:string;
	private query:string;
	private tableArr : Array<string>;
	private type : boolean;

	constructor(input:string){
		conn.query('desc '+input, (err, data) => {
			if(err){
				console.log(err);
			}else{
				let tbl_len = data.length;
				this.table = input;
				this.tableArr = [];
				for(let i=0; i < tbl_len; i++){
					this.tableArr.push(data[i].Field);
				}
			}
		})
	}
	/**
	 * defaultInfo
	 * 테이블 기본정보 조회
	 */
	public defaultInfo() {
		return this.tableArr;
	}
	/**
	 * selectAll
	 * 테이블을 모두 조회할 때 사용
	 */
	public selectAll(){
		this.query = `select * from ${this.table}`;
		this.type = true;

		return this;
	}
	/**
	 * selectOne
	 * 원하는 조건을 충족하는 1개 결과값을 원할 경우
	 */
	public selectOne(input:Object){
		this.query = `select * from ${this.table} where `;
		let whereArr:Array<any> = [];
		Object.keys(input).map((data) => {
			whereArr.push(` ${data} = '${input[data]}' `)
		});
		this.query += whereArr.join(' AND ');
		this.query += ` limit 1`;
		this.type = true;

		return this;
	}

	public selectList(input:Object){
		this.query = `select * from ${this.table} where `;
		let whereArr:Array<any> = [];
		Object.keys(input).map((data) => {
			whereArr.push(` ${data} = '${input[data]}' `)
		});
		this.query += whereArr.join(' AND ');
		this.type = true;

		return this;
	}
	/**
	 * insert 함수
	 * map 형태의 input을 받음
	 * key 값은 table 의 col 이름, val 값은 넣을 데이터
	 */
	public insert(input:Object){
		let colArr:Array<any> = [];
		let valueArr:Array<any> = [];
		let col:string;
		let value:string;
		this.query = `insert into ${this.table} `;

		Object.keys(input).map((key) => {
			colArr.push(key);
			valueArr.push(input[key]);
		});
		
		col = colArr.join(", ");
		value = valueArr.join("', '");

		this.query += `(${col}) values('${value}')`;
		this.type = false;

		return this;
	}
	/** 
	 * update 함수
	*/
	public update(input:Object){
		let colArr:Array<any> = [];
		let valueArr:Array<any> = [];
		let setArr:Array<any> = [];
		let setString:string = "";

		this.query = `update ${this.table} set `;
		Object.keys(input).map((key) => {
			if(key != 'idx' && key != 'c_date' && key != 'u_date' && key != 'd_date'){
				setArr.push(`${key} = '${input[key]}'`);
			}
		});
		setString = setArr.join(", ");

		this.query += setString;
		this.query += ` where idx = '${input.idx}'`;
		this.type = false;

		return this;
	}
	public delete(input:number){
		this.query = `delete from ${this.table} where idx = '${input}'`;
		this.type = false;

		return this;
	}

	public order(input:Object){
		Object.keys(input).map((key) => {
			this.query += ` order by ${key} ${input[key]}`;
		});

		return this;
	}

	public limit(input:number){
		this.query += ` limit ${input}`;

		return this;
	}

	/**
	 * queryWork 함수
	 * 마지막에 queryWork 을 실행하면 등록된 this.query 를 실행한다.
	 * 반환값이 필요한 명령이었는지는 this.type 을 통해 판별
	 */
	public go(callback){
		console.log(this.query);
		conn.query(this.query, (err, data) => {
			if(err){
				callback(err);
			}else if(!data.length){
				if(this.type){
					callback({msg : 'no_res'});
				}else{
					callback({msg : 'done'});
				}
			}else{
				callback(data);
			}
		});
	}

	public querychk(){
		return this.query;
	}
}
