'use strict';

import express from "express";
import userController from "../../controller/users/userController.js";
import admin from "../../middlewares/admin.js";

const router=express.Router();

//middlewares
router.get("/:uid/info",admin.checkAdmin);
router.post("/update/:uid",admin.checkAdmin);

//routers
router.get("/:uid/info",userController.info);
router.post("/login",userController.login);
router.get("/signout",userController.signout);
router.post("/register",userController.register);
router.post("/update/:uid",userController.update_portrait);
router.delete("/remove/:uid",userController.remove);

export default router;