'use strict';

import express from "express";
import path from "path";

//import routers
import views from "./views/index.js";
import users from "./users/index.js";
import apis from "./apis/index.js";
import docs from "./docs/index.js";
import edit from "./edit/index.js";

export default app=>{
	app.use('/views',views);
	app.use('/users',users);
	app.use('/apis',apis);
	app.use('/docs',docs);
	app.use('/edit',edit);
};