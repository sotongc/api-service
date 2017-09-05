'use strict';

import mongoose from 'mongoose';

const Schema=mongoose.Schema;

const userSchema=new Schema({
	name:String,
	password:String,
	join:Number,
	portrait:String,
	contributed:[
		{
			type:Schema.Types.ObjectId,
			ref:'Document'
		}
	]
});

const User=mongoose.model('User',userSchema);

export default User;