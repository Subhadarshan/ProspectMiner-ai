import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getJobLeads } from "../services/api";

function JobResults() {
  const { id } = useParams();

  const [leads, setLeads] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, [id]);

  const fetchLeads = async () => {
    try {
      const res = await getJobLeads(id);

      if (Array.isArray(res.data)) {
        setLeads(res.data);
        setQuery(`Job #${id}`);
      } else {
        setLeads(res.data.leads || []);
        setQuery(res.data.query || `Job #${id}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scrape py-5">
      <div className="container">
        <div className="p-4 mb-4 rounded-4 shadow-sm bg-light border">
          <h4 className="text-primary fw-semibold">
            Job #{id} - {query}
          </h4>
          <p className="text-muted mt-2 mb-0">{leads.length} Leads Extracted</p>
        </div>

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary"></div>
            <p className="mt-2">Loading leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center text-muted mt-5">
            <h5>No leads found</h5>
          </div>
        ) : (
          <div className="row">
            {leads.map((lead, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100 shadow border-0 rounded-4 p-3 lead-card">
                  <div className="d-flex justify-content-between">
                    <h5 className="fw-semibold mb-1">{lead.name || "N/A"}</h5>

                    <span className="badge bg-warning text-dark rating-badge p-2">
                      ⭐ {lead.rating || "N/A"}
                    </span>
                  </div>

                  <p className="text-muted small">
                    {lead.category || "No Category"}
                  </p>

                  <hr />

                  <p className="mb-1">
                    📍 {lead.address || "Address not available"}
                  </p>

                  <p className="mb-1">📞 {lead.phone || "No phone"}</p>

                  <p className="mb-1">📧 {lead.email || "No email"}</p>

                  {lead.website && (
                    <p className="mb-2">
                      🌐{" "}
                      <a href={lead.website} target="_blank" rel="noreferrer">
                        Visit Website
                      </a>
                    </p>
                  )}

                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span
                      className={`badge ${
                        lead.leadScore === "High"
                          ? "bg-danger"
                          : lead.leadScore === "Medium"
                            ? "bg-success"
                            : "bg-secondary"
                      }`}
                    >
                      {lead.leadScore || "N/A"}
                    </span>

                    <small className="text-muted">
                      {new Date(lead.createdAt).toLocaleDateString("en-GB")}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobResults;