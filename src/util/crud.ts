import { RequestHandler } from 'express';
import { conn } from './connector';

export class crud{
    public table;
    constructor(input){
        conn.query('desc ?',[input], (err, data) => {
            if(err){
                console.log(err);
            }else{
                console.log(data);
                this.table = data;
            }
        })
    }
}
