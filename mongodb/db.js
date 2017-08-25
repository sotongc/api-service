'use strict';

import mongoose from "mongoose";
import config from "../config/default.js";

mongoose.connect(config.url,{
	server:{auto_reconnect:true}
});
mongoose.Promise=global.Promise;

const db=mongoose.connection;

db.on("open",()=>{
	console.log("Connecting to mongodb succesfully...");
});

db.on("error",(err)=>{
	console.log(`Error in mongodb connection: ${err}`);
	mongoose.disconnect();
});

db.on("close",()=>{
	console.log("Close the connection, reconnecting...")
	mongoose.connect(config.url,{server:{auto_reconnect:true}});
});

export default db;