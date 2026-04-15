import express from "express";

import { getLeads } from "../controllers/leadController.js";

const router = express.Router();

router.get("/leads", getLeads);

export default router;