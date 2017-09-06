'use strict';

import express from "express";
import documentController from "../../controller/documents/documentController.js";
import log from "../../middlewares/log.js";
import admin from "../../middlewares/admin.js";

const router=express.Router();

//get document list
router.post("/hot",documentController.hot);
router.post("/recent",documentController.recent);
router.post("/:uid/contributed",documentController.contributed);

//admin middleware
router.post("/:uid/create",admin.checkAdmin);
router.delete("/:uid/remove/:did",admin.checkAdmin);

//modify document
router.post("/:uid/create",documentController.create);
router.delete("/:uid/remove/:did",documentController.remove);

//middleware
router.post("/:uid/create",log.record_log);
router.post("/:uid/create",log.record_contributed);
router.post("/:uid/create",log.record_contributor);

router.delete("/:uid/remove/:did",log.record_log);
router.delete("/:uid/remove/:did",log.record_contributed);
router.delete("/:uid/remove/:did",log.record_contributor);

export default router;