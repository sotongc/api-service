'use strict';

import express from "express";
import entry from "../controller/container/entry.js";
import test from "../controller/test.js";
const router=express.Router();

router.get("/home",entry.home);
router.get("/document/:id",entry.document);
router.get("/test",test.test)

export default router;