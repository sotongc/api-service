'use strict';

import express from "express";

import path from "path";

import entry from "./entry.js";
import docs from "./documents.js";

export default app=>{
	app.use('/views',entry);
	app.use('/docs',docs);
};