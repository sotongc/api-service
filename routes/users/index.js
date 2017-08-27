'use strict';

import express from "express";
import userController from "../../controller/users/userController.js";

const router=express.Router();

router.get("/:uid/info",userController.info);
router.post("/register",userController.register);
router.update("/:uid/update",userController.update);
router.delete("/:uid/remove",userController.remove);

export default router;