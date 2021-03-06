'use strict';

import express from "express";
import apiController from "../../controller/apis/apiController";
import log from "../../middlewares/log.js";
import admin from "../../middlewares/admin.js";

const router=express.Router();

//admin middleware
router.delete("/:uid/remove/:aid",admin.checkAdmin);

//routers
router.get("/:did/list",apiController.list);
router.get("/:aid/detail",apiController.detail);
router.delete("/:uid/remove/:aid",apiController.remove);

//middleware
router.delete("/:uid/remove/:aid",log.record_log);
router.delete("/:uid/remove/:aid",log.record_contributed);
router.delete("/:uid/remove/:aid",log.record_contributor);

export default router;