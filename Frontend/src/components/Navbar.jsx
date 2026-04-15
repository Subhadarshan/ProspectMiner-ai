import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar px-4 sticky-top shadow-sm">
      <Link className="navbar-brand fw-bold fs-5" to="/">
        ProspectMiner AI
      </Link>

      <button
        className="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
          <li className="nav-item">
            <Link
              className={`nav-link ${
                location.pathname === "/" ? "active-nav" : ""
              }`}
              to="/"
            >
              Dashboard
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                location.pathname === "/scrape" ? "active-nav" : ""
              }`}
              to="/scrape"
            >
              Scrape Leads
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}