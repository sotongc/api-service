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
			"success"
		].forEach((method)=>{
			this.__proto__[method]=this[method].bind(this);
		});
	}
	record_log(req,res,next){
		this[`${req.baseUrl.replace(/^\/\b/,"")}_handler`](req,res);
	}
	async record_contributed(req,res,next){

	}
	async record_contributor(req,res,next){

	}
	edit_handler(req){
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
}

export default new Log();