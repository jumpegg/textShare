import { RequestHandler } from 'express';
import * as request  from 'request';
import { conn } from '../util/connector';
import { Crud } from '../util/crud';

export class AccountCtrl{
	public accountTbl:any;
	public acc_infoTbl:any;
	public acc_userTbl:any;

	constructor(){
		this.accountTbl = new Crud('account');
		this.acc_infoTbl = new Crud('acc_info');
		this.acc_userTbl = new Crud('acc_user');
	}
	// create row
	public accMake:RequestHandler = (req, res)=>{
		req.body.study_idx = req.session.studyIdx;
		this.accountTbl
			.insert(req.body)
			.go((data)=>{
				res.json(data);
			})
	}
	public infoMake:RequestHandler = (req, res)=>{
		this.acc_infoTbl
			.insert(req.body)
			.go((data)=>{
				res.json(data);
			})
	}
	public userMake:RequestHandler = (req, res)=>{
		this.acc_userTbl
			.insert(req.body)
			.go((data)=>{
				res.json(data);
			})
	}
	//  get List
	public accList:RequestHandler = (req, res)=>{
		this.accountTbl
			.selectList({study_idx : req.session.studyIdx})
			.order({gathering : 'desc'})
			.limit(5)
			.go((data)=>{
				res.json(data);
			})
	}
	public infoList:RequestHandler = (req, res)=>{
		this.acc_infoTbl
			.selectList({acc_idx : req.params.idx})
			.go((data)=>{
				res.json(data);
			})
	}
	public userList:RequestHandler = (req, res)=>{
		let getQuery = 
		`select b.id, a.* from acc_user a
		inner join User b
		on a.user_idx = b.idx
		where a.acc_idx = ${req.params.idx}`;
		
		conn.query(getQuery, (err, data)=>{
			if(err){
				res.json({msg:'error'});
			}else{
				res.json(data);
			}
		})
	}
	// get One by idx
	public accGetOne:RequestHandler = (req, res)=>{
		this.accountTbl
			.selectOne({idx : req.params.idx})
			.go((data)=>{
				res.json(data[0]);
			})
	}
	public infoGetOne:RequestHandler = (req, res)=>{
		this.acc_infoTbl
			.selectOne({idx : req.params.idx})
			.go((data)=>{
				res.json(data);
			})
	}
	public userGetOne:RequestHandler = (req, res)=>{
		this.acc_userTbl
			.selectOne({idx : req.params.idx})
			.go((data)=>{
				res.json(data);
			})
	}
	public accGetLastOne:RequestHandler = (req, res)=>{
		this.accountTbl
			.selectList({study_idx : req.session.studyIdx})
			.order({gathering : 'desc'})
			.limit(1)
			.go((data)=>{
				res.json(data);
			})
	}
	// update
	public accUpdate:RequestHandler = (req, res)=>{
		this.accountTbl
			.update(req.body)
			.go((data)=>{
				res.json(data);
			})
	}
	public userUpdate:RequestHandler = (req, res)=>{
		this.acc_userTbl
			.update(req.body)
			.go((data)=>{
				res.json(data);
			})
	}
	// delete
	public infoDelete:RequestHandler = (req, res)=>{
		this.acc_infoTbl
			.delete(req.params.idx)
			.go((data)=>{
				res.json(data);
			})
	}
	public userDelete:RequestHandler = (req, res)=>{
		this.acc_userTbl
			.delete(req.params.idx)
			.go(data=>{
				res.json(data);
			})
	}
}

export const accountCtrl = new AccountCtrl();