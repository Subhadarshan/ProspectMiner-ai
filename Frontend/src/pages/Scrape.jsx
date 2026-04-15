import { useState } from "react";

import { startScrape } from "../services/api";
import ScrapeHistory from "../components/ScrapeHistory";

export default function Scrape() {
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");

  const [errors, setErrors] = useState({});
  const [newJob, setNewJob] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScrape = async () => {
    let newErrors = {};

    if (!type.trim()) {
      newErrors.type = "Scrape text is required";
    }

    if (!location.trim()) {
      newErrors.location = "Location is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await startScrape({
        query: `${type} in ${location}`,
      });

      const job = {
        id: res.data.jobId,
        keyword: `${type} in ${location}`,
        status: "Processing",
        addedAt: Date.now(),
      };

      setNewJob(job);

      setType("");
      setLocation("");
    } catch (err) {
      setErrors({ api: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scrape p-3">
      <div className="container">
        <div className="card shadow-sm border-1 px-4 pb-5">
          <h4 className="mb-4">🔍 Scrape Leads from Google</h4>

          <div className="row g-3">
            <div className="col-md-7">
              <input
                className="form-control"
                placeholder="Enter a text to scrape from Google"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
              {errors.type && (
                <small className="text-danger px-2">{errors.type}</small>
              )}
            </div>

            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Enter a location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              {errors.location && (
                <small className="text-danger px-2">{errors.location}</small>
              )}
            </div>

            <div className="col-md-2 d-flex align-items-start">
              <button
                className="scrape-button"
                onClick={handleScrape}
                disabled={loading}
              >
                {loading ? "Processing..." : "Start Scraping"}
              </button>
            </div>
          </div>

          {errors.api && <div className="text-danger mt-2">{errors.api}</div>}
        </div>

        <ScrapeHistory newJob={newJob} />
      </div>
    </div>
  );
}