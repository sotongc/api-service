'use strict';

import express from "express";
import editorController from "../../controller/editor/editorController.js";

const router=express.Router();

router.post("/doc/:did",editorController.document);
router.post("/api/:aid",editorController.api);

export default router;