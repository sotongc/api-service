'use strict';

import mongoose from 'mongoose';

const Schema=mongoose.Schema;

const logSchema=new Schema({
	time:Number,
	producer:{
		uid:String,
		name:String
	},
	description:String,
	target:{
		id:String,
		category:String
	}
});

const Log=mongoose.model('Log',logSchema);

export default Log;