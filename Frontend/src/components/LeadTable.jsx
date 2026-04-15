import { useState } from "react";

export default function LeadTable({ leads }) {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;

  const currentLeads = leads.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(leads.length / recordsPerPage);

  return (
    <div className="table-responsive card p-3">
      <table
        className="table table-striped table-hover align-middle"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            <th style={{ width: "5%" }}>S.No</th>
            <th style={{ width: "10%" }}>Job ID</th>
            <th style={{ width: "20%" }}>Name</th>
            <th style={{ width: "15%" }}>Category</th>
            <th style={{ width: "20%" }}>Address</th>
            <th style={{ width: "10%" }}>Rating</th>
            <th style={{ width: "12%" }}>Phone</th>
            <th style={{ width: "15%" }}>Email</th>
            <th style={{ width: "10%" }}>Score</th>
          </tr>
        </thead>

        <tbody>
          {currentLeads.length > 0 ? (
            currentLeads.map((lead, index) => (
              <tr key={lead._id}>
                <td>{indexOfFirst + index + 1}</td>

                <td>{lead.jobId}</td>

                <td className="text-wrap">{lead.name}</td>

                <td className="text-wrap">{lead.category}</td>

                <td className="text-wrap">{lead.address}</td>

                <td>
                  {lead.rating ? (
                    lead.rating
                  ) : (
                    <span className="text-muted">No rating</span>
                  )}
                </td>

                <td>
                  {lead.phone ? (
                    lead.phone
                  ) : (
                    <span className="text-muted">No phone</span>
                  )}
                </td>

                <td>
                  {lead.email ? (
                    lead.email
                  ) : (
                    <span className="text-muted">No email</span>
                  )}
                </td>

                <td>
                  <span
                    className={`badge 
              ${
                lead.leadScore === "High"
                  ? "bg-danger"
                  : lead.leadScore === "Medium"
                    ? "bg-success"
                    : "bg-warning"
              }
            `}
                  >
                    {lead.leadScore || "N/A"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No leads found
              </td>
            </tr>
          )}
        </tbody>
      </table>

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
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}