import express from "express";

import { scrapeLeads } from "../controllers/scrapeController.js";

const router = express.Router();

router.post("/scrape", scrapeLeads);

export default router;