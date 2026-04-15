import { scrapeQueue } from "../queues/scrapeQueue.js";

export const scrapeLeads = async (req, res) => {

  const { query } = req.body;

  const job = await scrapeQueue.add("scrapeJob", { query });

  res.json({
    success: true,
    jobId: job.id
  });
};