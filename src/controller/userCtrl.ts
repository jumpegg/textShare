import { RequestHandler } from 'express';
import { conn } from '../util/connector';

export class UserCtrl{
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
                console.log(req.session);
            }
        })
    }
}

export const userCtrl = new UserCtrl();
