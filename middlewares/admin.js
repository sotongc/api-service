'use strict';

import userModel from "../models/users.js";

class Check {
	constructor(){

	}
	async checkAdmin(req,res,next){
		const uid=req.session.uid;

		if(!uid || !Number(uid)){
			res.send({
				status:0,
				message:"not login yet"
			});
		}else{
			next();
		}
	}
}

export default new Check();

