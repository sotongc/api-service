'use strict';

class Test{
	constructor(){
		this.__proto__.test=this.test.bind(this);
	}
	async test(req,res,next){
		

		try{
			let a=await this.timeout();
			res.send({
				status:1,
				message:"success",
				value:a
			});
		}catch(error){
			console.error(error);
			res.send({
				status:0,
				message:"Error"
			});
		}
	}
	timeout(){
		return new Promise(function(resolve,reject){
			let a=1;
			try{
				setTimeout(()=>{
					resolve(++a);
				});
			}catch(err){
				reject(err);
			}
		});
	}
}

export default new Test();