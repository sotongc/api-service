'use strict';

import userModel from "../../models/users.js";
import crypto from "crypto";
import mongoose from "mongoose";

class User{
	constructor(){
		[
			"info","register","login","signout",
			"remove","update",
			"error","encryption",
			"Md5","random_text"
		].forEach((method)=>{
			this.__proto__[method]=this[method].bind(this);
		});
	}
	async login(){
		// 1. collect data
		let usr={
			name:req.body.name,
			password:req.body.password
		};
		// 2. if user not exist
		try{
			const user=await userModel.findOne({name:usr.name});

			if(!user){
				res.send({
					status:0,
					message:"user not exist"
				});
			}else if(user.password!==this.encryption(req.body.password,user.salt)){ // 3. if password not match
				res.send({
					status:0,
					message:"password incorrect"
				});
			}else{ // 4. if password match
				req.session.uid=user._id;

				const salt=this.Md5(this.random_text(12));
				const password=this.encryption(req.body.password,salt);

				await userModel.findByIdAndUpdate(user._id,{
					$set:{password:password,salt:salt}
				});

				res.send({
					status:1,
					message:"success"
				});
			}
		}catch(err){
			res.send({
				status:0,
				message:"login failed"
			});
		}		
	}
	async signout(req,res,next){
		try{
			delete req.session.uid;
			res.send({
				status:1,
				message:"signout success"
			});
		}catch(err){
			res.send({
				status:0,
				message:"signout failed"
			});
		}
	}
	async info(req,res,next){
		try{
			const info=await userModel.findById(req.params.uid);
			res.json({
				status:1,
				message:"info successfully",
				content:info
			});
		}catch(err){
			this.error(res,err);
		}	
	}
	async register(req,res,next){
		// 1. get data from request
		let new_user={
			_id:new mongoose.Types.ObjectId(),
			name:req.body.name,
			password:req.body.password,
			salt:"",
			join:new Date().getTime(),
			portrait:req.body.portrait,
			contributed:[]
		};
		// 2. username & password validation
		try {
			!new_user.name && throw new Error("user name cannot leave empty!");
			!new_user.password && throw new Error("password cannot leave empty!");
		}catch(err){
			res.send({
				status:0,
				message:err.message
			});
		}
		// 3. judge if username already exist
		try {
			const user=await userModel.findOne({name:new_user.name});

			if(user){
				res.send({
					status:0,
					message:"user already exist"
				});
			}else{
				// 4. password encryption
				const salt=this.Md5(this.random_text(12));
				const encryption=this.encryption(new_user.password,salt);

				new_user.password=encryption.password;
				new_user.salt=encryption.salt;

				// 5. save user infor into db
				await userModel.create(new_user);

				// 6. add uid into request session
				req.session.uid=new_user._id;

				res.send({
					status:1,
					message:"registration success"
				});
			}
		}catch(err){
			res.send({
				status:0,
				message:"user registration failed."
			});
		}
	}
	async remove(req,res,next){
		try{
			await userModel.findByIdAndRemove(req.params.uid);
			res.send({
				status:1,
				message:"successfully remove"
			});
		}catch(err){
			this.error(res,err);
		}
	}
	async update_portrait(req,res,next){ //mark something wrong here
		try{
			await userModel.findByIdAndUpdate(req.params.uid,{
				$set:{portrait:req.body.portrait}
			});

			res.send({
				status:1,
				message:"update successfully"
			});
		}catch(err){
			this.error(res,err);
		}
	}
	error(res,err){
		console.error("Failed:",err);
		res.send({
			status:0,
			message:err.message
		});
	}
	encryption(password,salt){
		return {
			salt:salt,
			password:this.Md5(salt+this.Md5(password))
		};
	}
	Md5(password){
		return crypto.createHash('md5').update(password,"utf8").digest('base64');
	}
	random_text(n){
		let x="0123456789qwertyuioplkjhgfdsazxcvbnm";
		let tmp="";

		for(let i=0;i<n;i++){
			tmp+=x.charAt(Math.ceil(Math.random()*100000000)%x.length);
		}

		return new Date.getTime()+tmp;
	}
}

export default new User();