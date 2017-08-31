'use strict';

import mongoose from 'mongoose';

const Schema=mongoose.Schema;

const docSchema=new Schema({
	title:String,
	description:String,
	creation:{
		user_id:String,
		user_name:String,
		time:Number
	},
	last_modify:{
		user_id:String,
		user_name:String,
		time:Number
	},
	statistics:{
		host:Number,
		api:Number,
		edit:Number,
		contributor:[
			{
				type:Schema.Types.ObjectId,
				ref:'User'
			}
		]
	},
	log:[
		{
			type:Schema.Types.ObjectId,
			ref:'Log'
		}
	]
});

const Documents=mongoose.model('Document',docSchema);

export default Documents;