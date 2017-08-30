'use strict';

import mongoose from 'mongoose';

const Schema=mongoose.Schema;

const logSchema=new Schema({
	time:Number,
	producer:{
		type:Schema.Types.ObjectId,
		ref:'User'
	},
	action:String,//[create,modify,remove]
	description:String,
	target:{
		model:String,
		item:{
			type:Schema.Types.ObjectId,
			refPath:'target.model'
		}	
	}
});

const Log=mongoose.model('Log',logSchema);

export default Log;