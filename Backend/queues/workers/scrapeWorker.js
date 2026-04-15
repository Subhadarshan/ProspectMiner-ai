import { Worker } from "bullmq";

import redisConnection from "../../config/redis.js";
import Lead from "../../models/Lead.js";
import { scrapeGoogleMaps } from "../../services/scraperService.js";
import { calculateLeadScore } from "../../utils/leadScore.js";

const worker = new Worker(

  "scrapeQueue",

  async job => {

    const { query } = job.data;

    console.log("Processing Job:", query);

    const leads = await scrapeGoogleMaps(query);

    const enriched = leads.map(lead => {

      const leadScore = calculateLeadScore(lead);

      return {

        ...lead,

        leadScore,
        jobId: Number(job.id)
      };
    });

    await Lead.insertMany(enriched);

    return enriched.length;
  },

  { connection: redisConnection }

);

worker.on("completed", job => {
  console.log(`Job ${job.id} Completed`);
});

worker.on("failed", (job, err) => {
  console.log("Job Failed", err);
});