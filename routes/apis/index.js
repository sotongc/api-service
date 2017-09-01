'use strict';

import express from "express";
import apiController from "../../controller/apis/apiController";
import log from "../../middlewares/log.js";

const router=express.Router();

//routers
router.get("/:did/list",apiController.list);
router.get("/:aid/detail",apiController.detail);
router.delete("/:uid/remove/:aid",apiController.remove);

//middleware
router.delete("/:uid/remove/:aid",log.record_log);

export default router;