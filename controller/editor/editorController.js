'use strict';

import apiModel from "../../models/api.js";

class Editor{
	constructor(){
		["document","api","build_struct","error"].forEach((method)=>{
			this.__proto__[method]=this[method].bind(this);
		});
	}
	async document(req,res,next){
		try{
			await apiModel.insertMany(req.body.docs);
			next();
		}catch(err){
			this.error(res,err);
		}
	}
	async api(req,res,next){
		try{
			await apiModel.findByIdAndUpdate(req.params.aid,this.build_struct(req.body));
			next();
		}catch(err){
			this.error(res,err);
		}
	}
	build_struct(update){
		return update;
	}
	error(res,err){
		console.error("Failed:",err);
		res.send({
			status:0,
			message:err.message
		});
	}
}

export default new Editor();