'use strict';

import docModel from "../../models/documents.js";
import apiModel from "../../models/api.js";
import userModel from "../../models/users.js";

class Document{
	constructor(){
		["hot","recent","contributed","create","remove"].forEach((method)=>{
			this.__proto__[method]=this[method].bind(this);
		});
	}
	async hot(req,res,next){
		try{

		}catch(err){
			console.error("Failed:Hot docs...\n",err);
			res.send({
				status:0,
				message:"failed to get hot document list"
			});
		}
	}
	async recent(req,res,next){
		try{

		}catch(err){
			console.error("Failed:Recent docs...\n",err);
			res.send({
				status:0,
				message:"failed to get recent document list"
			});
		}
	}
	async contributed(req,res,next){
		try{

		}catch(err){
			console.error("Failed:Contributed docs...\n",err);
			res.send({
				status:0,
				message:"failed to get contributed document list"
			});
		}
	}
	async create(req,res,next){
		try{
			const user=await userModel.findById(req.params.uid).select({name:1});
			await docModel.create({
				title:req.body.title,
				description:req.body.description,
				creation:{
					user_id:req.params.uid,
					user_name:user.name,
					time:new Date()
				},
				last_modify:{
					user_id:req.params.uid,
					user_name:user.name,
					time:new Date()
				},
				statistics:{
					host:0,
					api:0,
					edit:0,
					contributor:[
						{
							uid:req.params.uid,
							name:user.name
						}
					]
				}
			});

			res.send({
				status:1,
				message:"create successfully"
			});
		}catch(err){
			console.error("Failed:Create document...\n",err);
			res.send({
				status:0,
				message:"failed to create document"
			});
		}
	}
	async remove(req,res,next){
		try{
			await docModel.findByIdAndRemove(req.params.did);
			await apiModel.remove({docid:req.params.did});

			res.send({
				status:1,
				message:"remove successfully"
			});
		}catch(err){
			console.error("Failed:remove document...\n",err);
			res.send({
				status:0,
				message:"failed to remove document"
			});
		}
	}
}

export default new Document();