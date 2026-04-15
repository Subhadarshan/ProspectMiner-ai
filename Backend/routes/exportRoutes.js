import express from "express";

import { exportLeads } from "../controllers/exportController.js";

const router = express.Router();

router.get("/export/:id", exportLeads);

export default router;