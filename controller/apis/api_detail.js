'use strict';

import ApiModel from "../../models/api.js";

class ApiDetail{
	constructor(){
		this.__proto__.getApiDetail=this.getApiDetail.bind(this);
	}
	async getApiDetail(req,res,next){
		let docid=req.params.docid;
		let pid=req.body.pid;

		try{
			const api_detail=await ApiModel.findById(pid);

			res.json({
				status:1,
				message:"success",
				content:api_detail
			});
		}catch(error){
			console.error("Failed to get the target api detail",error);
			res.send({
				status:0,
				message:"failed to get the api detail: "+pid
			});
		}
	}
}

export default new ApiDetail();