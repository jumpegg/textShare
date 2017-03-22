import { RequestHandler } from 'express';
import { conn } from '../util/connector';
import { Crud } from '../util/crud';

export class UserCtrl{
    public usertbl:any;

    constructor(){
        this.usertbl = new Crud('User');
    }
    public login: RequestHandler = (req, res) => {
        conn.query('select * from User where id = ? and password = ?',[req.body.id, req.body.password], (err, data) => {
            if(err){
                console.log(err);
            }else if(!data.length){
                res.json({
                    idx: 'no_user'
                });
            }else{
                req.session.user = data;
                res.json(data);
            }
        })
    }
    public join: RequestHandler = (req, res) => {
        console.log( this.usertbl.insert(req.body).queryWork());
        
    }
    public test: RequestHandler = (req, res) =>{
        console.log(this.usertbl.defaultInfo());
        res.json({ output : this.usertbl.defaultInfo()});
    }
}

export const userCtrl = new UserCtrl();
