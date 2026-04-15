import { scrapeQueue } from "../queues/scrapeQueue.js";
import Lead from "../models/Lead.js";

export const getJobStatus = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await scrapeQueue.getJob(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const state = await job.getState();

    res.json({
      id: job.id,
      state,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};


export const getJobs = async (req, res) => {
  const jobs = await scrapeQueue.getJobs([
    "waiting",
    "active",
    "completed",
    "failed",
    "delayed",
    "paused",
  ]);

  const history = jobs.map((job) => {
    let status = "Processing";

    if (job.failedReason) {
      status = "Failed";
    } else if (job.finishedOn) {
      status = "Completed";
    }

    return {
      id: job.id,
      keyword: job.data.query,
      status,
      addedAt: job.timestamp,
    };
  });

  history.sort((a, b) => b.addedAt - a.addedAt);

  res.json(history);
};


export const getJobLeads = async (req, res) => {
  try {
    const jobId = Number(req.params.id);

    const job = await scrapeQueue.getJob(jobId);
    const leads = await Lead.find({ jobId });

    res.json({
      leads,
      query: job?.data?.query || `Job #${jobId}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};


export const deleteJobLead = async (req, res) => {
  try {
    const id = req.params.id;

    const job = await scrapeQueue.getJob(id);

    if (job) {
      await job.remove();
    }

    await Lead.deleteMany({ jobId: Number(id) });

    res.json({ message: "Job and leads deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Delete failed" });
  }
};