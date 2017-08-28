'use strict';

import apiModel from "../../models/api.js";

class Editor{
	constructor(){
		["document","api"].forEach((method)=>{
			this.__proto__[method]=this[method].bind(this);
		});
	}
	async document(req,res,next){
		try{
			await apiModel.insertMany(req.body.docs);
			res.send({
				status:1,
				message:"Insert successfully"
			})
		}catch(err){
			console.error("Failed:Update document...\n",err);
			res.send({
				status:0,
				message:"failed to update";
			});
		}
	}
	async api(req,res,next){
		try{
			await apiModel.findByIdAndUpdate(req.params.aid,this.build_struct(req.body));
			res.json({
				status:1,
				message:"api update successfully"
			});
		}catch(err){
			console.error("Failed:Update api...\n",err);
			res.send({
				status:0,
				message:"failed to update api"
			});
		}
	}
	build_struct(update){
		return update;
	}
}

export default new Editor();