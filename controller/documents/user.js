'use strict';

import UserModel from "../../models/users.js";

class User{
	constructor(){
		this.__proto__.getUserInfo=this.getUserInfo.bind(this);
	}
	async getUserInfo(req,res,next){
		let uid=req.params.uid;

		try{
			const target_user=await UserModel.findById(uid).select({
				name:1,
				join:1,
				portrait:1
			});

			res.json({
				status:1,
				data:target_user,
				message:"successfully"
			});
		}catch(error){
			console.error("Failed to get target user with given uid",error);

			res.send({
				status:0,
				type:'ERROR_GET_TARGET_USER',
				message:"failed to get target user with given uid"
			});
		}
	}
};

export default new User();