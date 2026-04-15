import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getJobs, deleteJob, exportJobLeads } from "../services/api";

export default function ScrapeHistory({ newJob }) {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const recordsPerPage = 5;

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const loadJobs = async () => {
    try {
      const res = await getJobs();
      setJobs(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (newJob) {
      loadJobs();
    }

    const interval = setInterval(() => {
      loadJobs();
    });

    return () => clearInterval(interval);
  }, [newJob]);

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentJobs = jobs.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(jobs.length / recordsPerPage);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteJob(selectedId);
      loadJobs();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    } finally {
      setShowModal(false);
      setSelectedId(null);
    }
  };

  const handleExport = (id) => {
    window.open(exportJobLeads(id), "_blank");
  };

  return (
    <div className="card p-3 mt-4">
      <h5>Scrape History</h5>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Job Id</th>
                <th>Keyword</th>
                <th>Status</th>
                <th>Added At</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentJobs.length > 0 ? (
                currentJobs.map((job) => (
                  <tr key={job.id}>
                    <td>{job.id}</td>
                    <td>{job.keyword}</td>

                    <td>
                      {job.status === "Completed" && (
                        <span className="badge bg-success">Completed</span>
                      )}

                      {job.status === "Processing" && (
                        <span className="badge bg-warning text-dark">
                          Processing
                        </span>
                      )}

                      {job.status === "Failed" && (
                        <span className="badge bg-danger">Failed</span>
                      )}
                    </td>

                    <td>
                      {new Date(job.addedAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>

                    <td>
                      {job.status === "Completed" && (
                        <div className="d-flex flex-wrap gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => navigate(`/job/${job.id}`)}
                          >
                            View
                          </button>

                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleExport(job.id)}
                          >
                            Export
                          </button>

                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteClick(job.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}

                      {job.status === "Processing" && (
                        <span className="text-muted small">Processing...</span>
                      )}

                      {job.status === "Failed" && (
                        <div className="d-flex flex-wrap gap-2">
                          <span className="text-danger small">Failed</span>

                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteClick(job.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No jobs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          className="btn btn-secondary"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      {showModal && (
        <>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-danger">Confirm Delete</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <p>
                    Delete Job ID: <strong>{selectedId}</strong> and its leads?
                  </p>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={confirmDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop show"></div>
        </>
      )}
    </div>
  );
}