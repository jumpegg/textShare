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
    public defaultInfo() {
        return this.tableArr;
    }
    public selectAll(){
        this.query = `select * from ${this.table}`;
        this.type = true;
    }
    public selectOne(input:Map<string, string>){
        this.query = `select * from ${this.table} where `;
        for(let [key, val] of input.entries()){
            this.query += `${key} = ${val}`;
        }
        this.type = true;
    }
    
    /**
     * insert 함수
     * map 형태의 input을 받음
     * key 값은 table 의 col 이름, val 값은 넣을 데이터
     */
    public insert(input:Map<string, string>){
        let colArr:Array<string> = [];
        let valueArr:Array<string> = [];
        let col:string;
        let value:string;
        this.query = `insert into ${this.table} `;

        for(let [key, val] of input.entries()){
            colArr.push(key);
            valueArr.push(val);
        }
        col = colArr.join(', ');
        value = valueArr.join(', ');

        this.query += `(${col}) values(${value})`;
        this.type = false;
    }

    /**
     * queryWork 함수
     * 마지막에 queryWork 을 실행하면 등록된 this.query 를 실행한다.
     * 반환값이 필요한 명령이었는지는 this.type 을 통해 판별
     */
    public queryWork(){
        conn.query(this.query, (err, data) => {
            if(err){
                console.log(err);
            }else if(!data.length){
                if(this.type){
                    return {mesg : 'no_res'};
                }else{
                    return {mesg : 'done'};
                }
            }else{
                return data;
            }
        });
    }

}
