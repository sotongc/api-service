'use strict';

import express from "express";
import viewController from "../../controller/views/viewController.js";

const router=express.Router();

router.get("/login",viewController.login);
router.get("/register",viewController.register);
router.get("/docs",viewController.docs);
router.get("/doc/:doc_id/apis",viewController.apis);
router.get("/doc/:doc_id/edit",viewController.edit);
router.get("/api/:api_id/edit",viewController.edit);

export default router;