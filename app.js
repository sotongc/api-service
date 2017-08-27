'use strict';

import express from "express";
//import db from "./mongodb/db.js";
import config from "./config/default.js";
import router from "./routes/index.js";

const app=express();


app.all('*',(req,res,next)=>{

	let Header={
		"Access-Control-Allow-Origin":req.headers.origin||'*',
		"Access-Control-Allow-Headers":[
			"Content-Type",
			"Authorization",
			"X-Requested-With"
		].join(", "),
		"Access-Control-Allow-Methods":[
			"PUT","POST","GET","DELETE","OPTIONS"
		].join(","),
		"X-Powered-By":"Express/4.15.3"
	};

	Object.keys(Header).forEach((key)=>{
		res.header(key,Header[key]);
	});

	(req.method=='OPTIONS')?res.send(200):next();
});

router(app);
app.use(express.static('./public'));
app.listen(config.port,()=>{console.log("Listening on port "+config.port)});

