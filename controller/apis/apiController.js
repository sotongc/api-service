'use strict';

import apiModel from "../../models/api.js";

class API{
	constructor(){
		["list","detail"].forEach((method)=>{
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
				message:"successfully"
			});
		}catch(err){
			console.error("Failed:List apis...\n",err);
			res.send({
				status:0,
				message:"failed to get the api list"
			});
		}
	}
	async detail(req,res,next){
		try{
			const detail=await apiModel.findById(req.params.aid);
			res.json({
				status:1,
				message:"successfully"
			});
		}catch(err){
			console.error("Failed:Get api detail...\n",err);
			res.send({
				status:0,
				message:"failed to get detail api info"
			});
		}
	}
}

export default new API();