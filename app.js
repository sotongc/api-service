'use strict';

import express from "express";
import db from "./mongodb/db.js";
import config from "./config/default.js";
import router from "./routes/index.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import connectMongo from "connect-mongo";
import winston from "winston";
import expressWinston from "express-winston";

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

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

const MongoStore=connectMongo(session);
app.use(cookieParser());
app.use(session({
	name:config.session.name,
	secret:config.session.secret,
	resave:true,
	saveUninitialized:false,
	cookie:config.session.cookie,
	store:new MongoStore({
		url:config.url
	})
}));

app.use(expressWinston.logger({
	transports:[
		new (winston.transports.Console)({
			json:true,
			colorize:true
		}),
		new winston.transports.File({
			filename:'logs/success.log'
		})
	]
}));

router(app);

app.use(expressWinston.errorLogger({
	transports:[
		new winston.transports.Console({
			json:true,
			colorize:true
		}),
		new winston.transports.File({
			filename:'logs/error.log'
		})
	]
}));

app.use(express.static('./public'));
app.listen(config.port,()=>{console.log("Listening on port "+config.port)});

