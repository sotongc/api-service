'use strict';

import express from "express";
import userController from "../../controller/users/userController.js";

const router=express.Router();

router.get("/:uid/info",userController.info);
router.post("/register",userController.register);
router.post("/update/:uid",userController.update);
router.delete("/remove/:uid",userController.remove);

export default router;