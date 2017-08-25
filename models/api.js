'use strict';

import mongoose from "mongoose";

const Schema=mongoose.Schema;

const apiSchema=new Schema({
	path:String,
	method:String,
	description:String,
	host:String,
	docid:String,
	category:String,
	request:{
		query:String,
		header:{
			"Content-type":String
		},
		body:String
	},
	response:{
		mime:String,
		sample:String,
		error:{
			code:String,
			message:String
		}
	},
	note:String
});

const Api=mongoose.model('Api',apiSchema);

export default Api;