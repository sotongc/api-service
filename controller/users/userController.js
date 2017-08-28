'use strict';

import userModel from "../../models/users.js";

class User{
	constructor(){
		["info","register","remove","update"].forEach((method)=>{
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
			console.error("Failed: get user info...\n",err);
			res.send({
				status:0,
				message:"failed get user info"
			});
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
			console.error("Failed:Register process...\n",err);
			res.send({
				status:0,
				message:"Failed to register"
			});
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
			console.error("Failed:Remove user...\n",err);
			res.send({
				status:0,
				message:"Failed to remove"
			});
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
			console.error("Failed:Update user...\n",err);
			res.send({
				status:0,
				message:"Failed to update"
			});
		}
	}
}

export default new User();