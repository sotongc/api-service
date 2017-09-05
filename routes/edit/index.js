'use strict';

import express from "express";
import editorController from "../../controller/editor/editorController.js";
import log from "../../middlewares/log.js";

const router=express.Router();

//routers
router.post("/:uid/doc/:did",editorController.document);
router.post("/:uid/api/:aid",editorController.api);

//middleware
router.post("/:uid/doc/:did",log.record_log);
router.post("/:uid/doc/:did",log.record_contributed);
router.post("/:uid/doc/:did",log.record_contributor);

router.post("/:uid/api/:aid",log.record_log);
router.post("/:uid/api/:aid",log.record_contributed);
router.post("/:uid/api/:aid",log.record_contributor);

export default router;