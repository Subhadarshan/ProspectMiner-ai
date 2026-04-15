import { useState } from "react";

export default function Filters({ onFilter }) {
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    score: "",
    search: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    onFilter(filters);
  };

  return (
    <div className="card p-3 mb-3 shadow-sm">
      <div className="row g-3">
        <div className="col-md-3">
          <input
            type="text"
            name="category"
            className="form-control"
            placeholder="Enter category"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <input
            name="location"
            className="form-control"
            placeholder="Enter location"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <select name="score" className="form-select" onChange={handleChange}>
            <option value="">All Scores</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="col-md-3 d-flex">
          <input
            name="search"
            className="form-control me-2"
            placeholder="Search by leads"
            onChange={handleChange}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}