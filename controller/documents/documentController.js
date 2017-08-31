'use strict';

import docModel from "../../models/documents.js";
import apiModel from "../../models/api.js";
import userModel from "../../models/users.js";

class Document{
	constructor(){
		["hot","recent","contributed","create","remove","paginate"].forEach((method)=>{
			this.__proto__[method]=this[method].bind(this);
		});
	}
	async hot(req,res,next){
		try{
			const hot=await docModel.find(this.paginate(req.body.page,req.body.last,"statistics.edit",-1))
				.limit(req.body.page.unit_num).sort({
					"statistics.edit":-1
			});

			res.json({
				status:1,
				message:"get hot list successfully",
				content:{
					list:hot
				},
				page:{
					unit_num:req.body.page.unit_num,
					page_num:req.body.page.page_num
				}
			});
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
			const recent=await docModel.find(this.paginate(req.body.page,req.body.last,"last_modify.time",-1))
				.limit(req.body.page.unit_num).sort({
					"last_modify.time":-1
			});

			res.send({
				status:1,
				message:"success",
				content:{
					list:recent
				}
				page:{
					unit_num:req.body.page.unit_num,
					page_num:req.body.page.page_num
				}
			});
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
			const contributed=await docModel.find({
				"statistics.contributor"
			}).limit(req.body.page.unit_num).sort({
				_id:1
			});

			res.send({
				status:1,
				message:"success",
				content:{
					list:contributed
				},
				page:{
					unit_num:req.body.page.unit_num,
					page_num:req.body.page.page_num
				}
			});
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
	/**
	 * #pagination#
	 * @ params-page
	 * @ params-last 
	 */
	paginate(page,last,sortby,order){
		let chain=sortby.split(".");
		let key=chain[chain.length-1];

		if(page.page_num>1){
			if(last[sortby]&&last.id){
				return {
					[sortby]:(order<0)?{$lte:last[key]}:{$gte:last[key]},
					_id:{$ne:last.id}
				};
			}
			throw new Error(`last id & ${key} must not be empty`);
		}
		return null;
	}
}

export default new Document();