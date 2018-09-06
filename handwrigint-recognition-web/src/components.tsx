import * as React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => (
  <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-white">
    <div className="container">
      <Link className="navbar-brand" to="/">
        Nepali Handwriting Recognition
      </Link>
      {/* <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Predict
            </a>
          </li>
        </ul>
      </div> */}
    </div>
  </nav>
);
