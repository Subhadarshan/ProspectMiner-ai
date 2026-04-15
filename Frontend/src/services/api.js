import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const getLeads = () => API.get("/leads");

export const startScrape = (data) => API.post("/scrape", data);

export const getJobs = () => API.get("/jobs");
// export const getJobStatus = (id) => API.get(`/job/${id}`);
export const getJobLeads = (id) => API.get(`/job-leads/${id}`);

export const deleteJob = (id) => API.delete(`/job/${id}`);
export const exportJobLeads = (id) => `${API.defaults.baseURL}/export/${id}`; 