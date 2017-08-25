'use strict';

import ApiModel from "../../models/api.js";

class Apilist{
	constructor(){
		this.__proto__.getApiList=this.getApiList.bind(this);
	}
	async getApiList(req,res,next){
		let docid=req.params.docid;

		try{
			const api_list=await ApiModel.find({
				docid:docid
			}).sort({
				host:1,
				category:1
			}).select({
				_id:1,
				path:1,
				method:1,
				description:1,
				host:1,
				docid:1,
				category:1,
				note:1
			});

			res.json({
				status:1,
				message:"success",
				content:{
					list:api_list
				}
			});
		}catch(error){
			console.error("Failed to get api list",error);
			res.send({
				status:0,
				message:"failed to get api list"
			});
		}
	}
}

export default new Apilist();
