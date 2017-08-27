'use strict';

import express from "express";
import path from "path";

//import routers
import views from "./views/index.js";
import users from "./users/index.js";

export default app=>{
	app.use('/views',views);
	app.use('/users',users);
};