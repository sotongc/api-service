'use strict';

import express from "express";
import documentController from "../../controller/documents/documentController.js";

const router=express.Router();

//get document list
router.post("/hot",documentController.hot);
router.post("/recent",documentController.recent);
router.post("/:uid/contributed",documentController.contributed);

//modify document
router.post("/:uid/create",documentController.create);
router.delete("/:uid/remove",documentController.remove);

export default router;