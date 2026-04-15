import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import scrapeRoutes from "./routes/scrapeRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";

import "./queues/workers/scrapeWorker.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", scrapeRoutes);
app.use("/api", jobRoutes);
app.use("/api", leadRoutes);
app.use("/api", exportRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});