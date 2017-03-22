import { RequestHandler } from 'express';
import { conn } from '../util/connector';
import { Crud } from '../util/crud';

export class UserCtrl{
    public usertest:any;

    constructor(){
        this.usertest = new Crud('User');
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
        conn.query('insert into User (id, password, email) values(?,?,?)',[req.body.id, req.body.password, req.body.email], (err, data) => {
            (err) ? console.log(err) : res.json({ mesg : true})
        })
    }
    public test: RequestHandler = (req, res) =>{
        console.log(this.usertest.defaultInfo());
        res.json({ output : this.usertest.defaultInfo()});
    }
}

export const userCtrl = new UserCtrl();
