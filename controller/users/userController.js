'use strict';

import userModel from "../../models/users.js";

class User{
	constructor(){
		["info","register","remove","update","error"].forEach((method)=>{
			this.__proto__[method]=this[method].bind(this);
		});
	}
	async info(req,res,next){
		try{
			const info=await userModel.findById(req.params.uid);
			res.json({
				status:1,
				message:"info successfully",
				content:info
			});
		}catch(err){
			this.error(res,err);
		}	
	}
	async register(req,res,next){
		try{
			await userModel.create({
				name:req.body.name,
				join:new Date().getTime(),
				portrait:req.body.portrait,
				contributed:[]
			});

			res.send({
				status:1,
				message:"register successfully"
			});
		}catch(err){
			this.error(res,err);
		}
	}
	async remove(req,res,next){
		try{
			await userModel.findByIdAndRemove(req.params.uid);
			res.send({
				status:1,
				message:"successfully remove"
			});
		}catch(err){
			this.error(res,err);
		}
	}
	async update(req,res,next){
		try{
			let updateItem={};
			req.body.name && (updateItem.name=req.body.name);
			req.body.portrait && (updateItem.portrait=req.body.portrait);

			await userModel.updateOne({_id:req.params.uid},updateItem);

			res.send({
				status:1,
				message:"update successfully"
			});
		}catch(err){
			this.error(res,err);
		}
	}
	error(res,err){
		console.error("Failed:",err);
		res.send({
			status:0,
			message:err.message
		});
	}
}

export default new User();