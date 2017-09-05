'use strict';

import apiModel from "../../models/api.js";

class API{
	constructor(){
		["list","detail","remove","error"].forEach((method)=>{
			this.__proto__[method]=this[method].bind(this);
		});
	}
	async list(req,res,next){
		try{
			const list=await apiModel.find({docid:req.params.did}).sort({
				host:1,
				category:1
			});

			res.json({
				status:1,
				message:"successfully",
				content:{
					list:list
				}
			});
		}catch(err){
			this.error(res,err);
		}
	}
	async detail(req,res,next){
		try{
			const detail=await apiModel.findById(req.params.aid);
			res.json({
				status:1,
				message:"successfully",
				content:{
					detail:detail
				}
			});
		}catch(err){
			this.error(res,err);
		}
	}
	async remove(req,res,next){
		try{
			await apiModel.findByIdAndRemove(req.params.aid);
			next();
		}catch(err){
			this.error(res,err);
		}
	}
	error(res,err){
		console.error("Failed: ",err);
		res.send({
			status:0,
			message:err.message
		});
	}
}

export default new API();