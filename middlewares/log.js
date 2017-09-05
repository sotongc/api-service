'use strict';

import logModel from "../models/log.js";
import userModel from "../models/users.js";
import docModel from "../models/documents.js";
import apiModel from "../models/api.js";

import mongoose from "mongoose";

class Log{
	constructor(){
		[
			"record_log",
			"record_contributed",
			"record_contributor",
			"edit_handler",
			"apis_handler",
			"docs_handler",
			"log_schema",
			"error",
			"success",
			"get_doc_id",
			"exist"
		].forEach((method)=>{
			this.__proto__[method]=this[method].bind(this);
		});
	}
	record_log(req,res,next){
		this[`${req.baseUrl.replace(/^\/\b/,"")}_handler`](req,res);
	}
	// step 2: record contributed list
	async record_contributed(req,res,next){
		const did=this.get_doc_id(req);

		try{
			const user=await userModel.findById(req.params.uid).select({contributed:1});
			
			if(!this.exist(user.contributed,did)){
				user.contributed.push(did);
				user.markModified("contributed");
				await user.save();
			}

			next();
		}catch(err){
			this.error(err,res);
		}
	}
	// step 3: record contributor list
	async record_contributor(req,res,next){
		const did=this.get_doc_id(req);

		try{
			const doc=await docModel.findById(did).select({"statistics.contributor":1});

			if(!this.exist(doc.statistics.contributor,req.params.uid)){
				doc.statistics.contributor.push(req.params.uid);
				doc.markModified("statistics.contributor");
				await doc.save();
			}

			this.success(res);
		}catch(err){
			this.error(err,res);
		}
	}
	// step 1: record log info
	async edit_handler(req){
		let model=req.path.split("/")[2];
		let iid=req.params.did||req.params.aid||"";

		let map={
			doc:"Document",
			api:"Api"
		};

		model=map[model];

		try{
			await logModel.create(this.log_schema(req.params.uid,iid,"update",model,""));
			next();
		}catch(err){
			this.error(err,res);
		}
	}
	async apis_handler(req,res){
		try{
			await logModel.create(this.log_schema(req.params.uid,req.params.aid,"remove","Api",""));
			next();
		}catch(err){
			this.error(err,res);
		}		
	}
	async docs_handler(req){
		let action=req.path.split("/")[2];
		let docid=req.locals.docid;

		try{
			await logModel.create(this.log_schema(req.params.uid,docid,action,'Document',""));
			next();
		}catch(err){
			this.error(err,res);
		}
	}
	//schemas
	log_schema(uid,iid,action,model,des){
		return {
			time:new Date().getTime(),
			producer:uid,
			action:action,
			description:des,
			target:{
				model:model,
				item:iid
			}
		};
	}
	//utils
	error(err,res){
		console.error(err);
		res.send({
			status:0,
			message:err.message
		});
	}
	success(res){
		res.send({
			status:1,
			message:"success"
		});
	}
	async get_doc_id(req){
		if(req.params.aid){
			const api=await apiModel.findById(req.params.aid).select({docid:1});
			return api.docid;
		}else{
			return req.params.did || req.locals.params.docid;
		}
	}
	exist(list,id){
		return Boolean(list.lastIndexOf(id)+1);
	}
}

export default new Log();