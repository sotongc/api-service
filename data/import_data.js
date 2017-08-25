'use strict';

// Connect to mongodb
import db from "../mongodb/db.js";

// Import models
import ApiModel from "../models/api.js";
import DocModel from "../models/documents.js";
import LogModel from "../models/log.js";
import UserModel from "../models/users.js";

// faker.js
import faker from "faker";
faker.locale="en";

class Import{
	constructor(){

	}
	//data importor
	async importor(collection,model,datalist){
		try{
			await model.insertMany(datalist);
			console.log(`Import ${collection} data successfully!`);
		}catch(err){
			console.error(`Failed to import ${collection} collection`,err);
		}
	}
	//utils
	ran_len(){
		return Math.round(Math.random()*20)||1;
	}
	select(list,cap){
		return list[Math.round(Math.random()*cap)];
	}
	generator(type){
		if(type==="id"){
			return faker.random.uuid().split("-").join("");
		}
	}
	//data creator
	api(){
		let len=this.ran_len();
		let api_list=[];

		for(let i=0;i<len;i++){
			api_list.push({
				path:faker.internet.url,
				method:this.select(['get','post','put','delete','head','option','trace'],6),
				description:faker.lorem.sentence(),
				host:faker.random.number(),
				docid:"",
				category:"",
				request:{
					query:"?features=16&type=1",
					header:{
						"Content-type":"application/json"
					},
					body:"{a:1,b:2,c:3}"
				},
				response:{
					mime:"application/json",
					sample:"{a:1,b:2,c:3}",
					error:{
						code:"0",
						message:"failed to get api list"
					}
				},
				note:faker.lorem.sentence()
			});
		}
		return api_list;
	}
	document(){
		let len=this.ran_len();
		let doc_list=[];

		for(let i=0;i<len;i++){
			doc_list.push({
				title:faker.lorem.text(),
				description:faker.lorem.sentence(),
				creation:{
					user_id:"",
					user_name:"",
					time:new Date().getTime()
				},
				last_modify:{
					user_id:"",
					user_name:"",
					time:new Date().getTime()
				},
				statistics:{
					host:faker.random.number(),
					api:faker.random.number(),
					edit:faker.random.number(),
					contributor:[
						{
							uid:this.generator("id"),
							name:faker.internet.userName()
						}
					]
				},
				log:["a","b"]
			});
		}
		return doc_list;
	}
	log(){
		let len=this.ran_len();
		let log_list=[];

		for(let i=0;i<len;i++){
			log_list.push({
				time:new Date().getTime(),
				producer:{
					uid:this.generator("id"),
					name:faker.internet.userName()
				},
				description:faker.lorem.sentence(),
				target:{
					id:this.generator("id"),
					category:"api"
				}
			});
		}
		return log_list;
	}
	user(){
		let len=this.ran_len();
		let user_list=[];

		for(let i=0;i<len;i++){
			user_list.push({
				name:faker.internet.userName(),
				join:new Date().getTime(),
				portrait:faker.internet.avatar,
				contributed:[]
			});
		}
		return user_list;
	}
};

const creation=new Import();

creation.importor("User",UserModel,creation.user());
creation.importor("Log",LogModel,creation.log());
creation.importor("Document",DocModel,creation.document());
creation.importor("API",ApiModel,creation.api());


