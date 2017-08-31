'use strict';

// Connect to mongodb
import db from "../mongodb/db.js";

import mongoose from "mongoose";

const objectid=mongoose.Types.ObjectId;

// Import models
import ApiModel from "../models/api.js";
import DocModel from "../models/documents.js";
import LogModel from "../models/log.js";
import UserModel from "../models/users.js";

// faker.js
import faker from "faker";
faker.locale="en";

class Creator{
	constructor(){
		this.Users=[];
		this.Documents=[];
		this.Apis=[];
		this.Log=[];

		/*ids*/
		this.uid=[];
		this.did=[];
	}
	/*save to db*/
	savedb(tasks){
		tasks.forEach(async function(task){
			try{
				await task.model.insertMany(task.datalist);
				console.log(`Create ${task.collection} data success`);
			}catch(err){
				console.error(err);
			}
		});
	}
	/*creators*/
	create(){
		let that=this;
		let schema=that.schema();
		return {
			user(){
				let num=that.length(20);
				let uid="";			

				for(let i=0;i<num;i++){
					uid=new objectid();
					that.uid.push(uid);

					that.Users.push(schema.user({
						_id:uid
					}));
				}
			},
			docs(){
				let num=that.length(40);
				let did="",lid="",contributor=[];

				for(let i=0;i<num;i++){
					did=new objectid();
					lid=new objectid();
					that.did.push(did);

					//1. create document & contributor info --done
					contributor=Array.from(new Set([that.pickup(that.uid),that.pickup(that.uid)]));

					let contributor_1=that.find(that.Users,contributor[0]);
					let contributor_2=that.find(that.Users,contributor[contributor.length-1]);

					that.Documents.push(schema.doc({
						_id:did,
						creation:{
							user_id:contributor[0],
							user_name:contributor_1.name
						},
						last_modify:{
							user_id:contributor[contributor.length-1],
							user_name:contributor_2.name
						}
					}));

					contributor.forEach(function(uid){
						that.Documents[i].statistics.contributor.push(uid);
					});	

					//2. log record & record log in document;--done
					this.log(lid,that.pickup(that.uid),'Document',did);
					that.Documents[i].log.push(lid);
					
					//3. user contributed list add
					contributor_1.contributed.push(did);
					(contributor.length-1) && contributor_2.contributed.push(did);
				}
			},
			apis(){
				
				let num=that.length(60);
				let aid="",lid="",contributor=null,doc=null;

				for(let i=0;i<num;i++){
					aid=new objectid();
					lid=new objectid();

					doc=that.find(that.Documents,that.pickup(that.did));
					contributor=that.find(that.Users,that.pickup(that.uid));

					//1. create api 
					that.Apis.push(schema.api({
						_id:aid,
						docid:doc._id
					}));

					//2. log record 
					this.log(lid,contributor._id,'Api',aid);
					
					//3. contributor info for document & record log in doc;
					doc.statistics.contributor.push(contributor._id);
					doc.log.push(lid);

					//4. user contributed list add
					contributor.contributed.push(doc._id);
				}
			},
			log(lid,uid,model,item_id){
				that.Log.push(schema.log({
					_id:lid,
					producer:uid,
					model:model,
					item:item_id
				}));
			}
		};
	}
	/*schema*/
	schema(){
		let that=this;
		return {
			user(o){
				return {
					_id:o._id,
					name:faker.internet.userName(),
					join:that.timestamp(),
					portrait:faker.internet.avatar(),
					contributed:[]
				};
			},
			doc(o){
				return {
					_id:o._id,
					title:faker.lorem.words(),
					description:faker.lorem.sentence(),
					creation:{
						user_id:o.creation.user_id,
						user_name:o.creation.user_name,
						time:that.timestamp()
					},
					last_modify:{
						user_id:o.last_modify.user_id,
						user_name:o.last_modify.user_name,
						time:that.timestamp()
					},
					statistics:{
						host:faker.random.number(),
						api:faker.random.number(),
						edit:faker.random.number(),
						contributor:[]
					},
					log:[]
				}
			},
			api(o){
				return {
					_id:o._id,
					path:faker.internet.url(),
					method:that.method(),
					description:faker.lorem.sentence(),
					host:faker.internet.url(),
					docid:o.docid,
					category:faker.lorem.word(),
					request:{
						query:"",
						header:{
							"Content-type":"application/json"
						},
						body:""
					},
					response:{
						mime:"application/json",
						sample:"",
						error:{
							code:"",
							message:""
						}
					},
					note:""
				};
			},
			log(o){
				return {
					_id:o._id,
					time:that.timestamp(),
					producer:o.producer,
					description:faker.lorem.sentence(),
					action:that.action(),
					target:{
						model:o.model,
						item:o.item
					}
				};
			}
		};
	}
	/*utils*/
	timestamp(){
		return (new Date().getTime()/1000-Math.round(3600*24*Math.random()*40))*1000;
	}
	method(){
		return ["GET","POST","PUT","DELETE","OPTION","HEAD","TRACE"][Math.round(Math.random()*6)];
	}
	action(){
		return ["create","remove","modify"][Math.round(Math.random()*2)];
	}
	length(n){
		return Math.round(Math.random()*n+Math.random()*9)+Math.round(Math.random()*5)+3;
	}
	indicator(n){
		return Math.round(Math.random()*n);
	}
	pickup(list){
		return list[this.indicator(list.length-1)];
	}
	find(list,id){
		let lo=0,
			hi=list.length-1,
			mid=0;

		while(lo<=hi){
			mid=Math.floor((hi-lo)/2)+lo;

			if(id<list[mid]._id){
				hi=mid-1;

			}else if(id>list[mid]._id){
				lo=mid+1;
			}
			else{
				return list[mid];
			}
		}
		return null;
	}
	/*run*/
	run(){
		let generator=this.create();

		// 1. generate users
		generator.user();
		console.log("Get users list success...");

		//2. generate documents
		generator.docs();
		console.log("Get documents list success & record log info...");

		//3. generate apis
		generator.apis();
		console.log("Get apis list success & record log info...");

		//save the datalist to the database
		this.savedb([
			{
				model:UserModel,
				datalist:this.Users,
				collection:"user"
			},
			{
				model:DocModel,
				datalist:this.Documents,
				collection:"document"
			},
			{
				model:ApiModel,
				datalist:this.Apis,
				collection:"api"
			},
			{
				model:LogModel,
				datalist:this.Log,
				collection:"log"
			}
		]);

	}
}

const creator=new Creator();

creator.run();