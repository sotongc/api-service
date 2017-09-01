'use strict';

import express from "express";
import documentController from "../../controller/documents/documentController.js";
import log from "../../middlewares/log.js";

const router=express.Router();

//get document list
router.post("/hot",documentController.hot);
router.post("/recent",documentController.recent);
router.post("/:uid/contributed",documentController.contributed);

//modify document
router.post("/:uid/create",documentController.create);
router.delete("/:uid/remove/:did",documentController.remove);

//middleware
router.post("/:uid/create",log.record_log);
router.delete("/:uid/remove/:did",log.record_log);

export default router;