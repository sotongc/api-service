'use strict';

import express from "express";
import apiController from "../../controller/apis/apiController";

const router=express.Router();

router.get("/:did/list",apiController.list);
router.get("/:aid/detail",apiController.detail);

export default router;