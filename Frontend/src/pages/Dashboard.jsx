import { useEffect, useState } from "react";

import { getLeads } from "../services/api";
import Filters from "../components/Filters";
import Stats from "../components/Stats";
import LeadTable from "../components/LeadTable";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    const res = await getLeads();
    setLeads(res.data);
    setFilteredLeads(res.data);
  };

  const handleFilter = (filters) => {
    let result = leads;

    if (filters.category) {
      result = result.filter((l) =>
        l.category?.toLowerCase().includes(filters.category.toLowerCase()),
      );
    }

    if (filters.location) {
      result = result.filter((l) =>
        l.address?.toLowerCase().includes(filters.location.toLowerCase()),
      );
    }

    if (filters.score) {
      result = result.filter((l) => l.leadScore === filters.score);
    }

    if (filters.search) {
      result = result.filter((l) =>
        l.name?.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    setFilteredLeads(result);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-hero d-flex align-items-center">
        <div className="container text-white">
          <div className="m-5">
            <h1 className="fw-bold display-5">
              Smart Lead Generation Dashboard
            </h1>
            <p className="lead">
              Discover, filter, and manage high-quality business leads
              effortlessly
            </p>
          </div>

          <div className="glass-card my-5 mx-3">
            <Filters onFilter={handleFilter} />
          </div>

          <Stats leads={filteredLeads} />

          <div className="lead-table container my-5">
            <LeadTable leads={filteredLeads} />
          </div>
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}