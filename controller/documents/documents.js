'use strict';

import DocModel from "../../models/documents.js";

class Documents{
	constructor(){
		[
			"getRecent",
			"getHot",
			"getContributed",
			"addDocument",
			"deleteDocument",
			"error"
		].forEach((func)=>{
			this.__proto__[func]=this[func].bind(this);
		});
	}
	async getRecent(req,res,next){
		let page_num=req.body.page_num;
		let unit_num=req.body.unit_num;
		let before=req.body.before||0;

		try{
			const recent_documents=await DocModel.find({
				last_modify:{
					time:{$gt:before}
				}
			}).sort({
				last_modify:{
					time:1
				}
			}).limit(unit_num);

			res.json({
				status:1,
				message:"success",
				content:{
					list:recent_documents,
					page_num:page_num,
					unit_num:unit_num,
					items_num:1000
				}
			});
		}catch(error){
			console.error("Failed to get recent documents list",error);

			res.send(this.error(0,"failed to get recent documents list"));
		}
	}
	async getHot(req,res,next){
		let page_num=req.body.page_num;
		let unit_num=req.body.unit_num;

		try{
			const hot_documents=await DocModel.find({
				statistics:{
					edit:{$gt:0}
				}
			}).sort({
				statistics:{
					edit:1
				}
			}).skip(page_num*unit_num).limit(unit_num);

			res.json({
				status:1,
				message:"success",
				content:{
					list:hot_documents,
					page_num:page_num,
					unit_num:unit_num,
					items_num:1000
				}
			})
		}catch(error){
			console.error("Failed to get documents list.",error);

			res.send(this.error(0,"failed to get documents list"));
		}
	}
	async getContributed(req,res,next){
		let page_num=req.body.page_num;
		let unit_num=req.body.unit_num;
		let uid=req.params.uid;

		try{
			const documents_contributed=await DocModel.find({
				statistics:{
					contributed:[
						{
							id:uid
						}
					]
				}
			}).skip(unit_num*page_num).limit(unit_num);

			res.json({
				status:1,
				message:"success",
				content:{
					list:documents_contributed,
					page_num:page_num,
					unit_num:unit_num,
					items_num:items_num
				}
			});
		}catch(error){
			console.error("Failed to get contributed documents list",error);

			res.send(this.error(0,"failed to get contributed documents list"));
		}
	}
	async addDocument(req,res,next){
		let new_doc={
			title:req.body.title,
			description:req.body.description,
			creation:{},
			last_modify:{},
			statistics:{
				host:0,
				api:0,
				edit:0,
				contributor:[]
			},
			log:[]
		};

		try{
			await DocModel.create(new_doc);
		}catch(error){
			console.error("Failed to insert new document in the collection",error);

			res.send(this.error(0,"failed to insert new document"));
		}
	}
	async deleteDocument(req,res,next){
		let cid=req.params.cid;

		try{
			await DocModel.findByIdAndRemove(cid);
			res.json({
				status:1,
				message:"success"
			});
		}catch(error){
			console.error("Failed to delete item: "+cid,error);
			res.send(this.error(0,"failed to delete"));
		}
	}
	error(code,message){
		return {
			status:code,
			message:message
		};
	}
}

export default new Documents();