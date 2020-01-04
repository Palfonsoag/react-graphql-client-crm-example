import React from "react";
import { Link } from "react-router-dom";
import CloseSession from "./CloseSession";
import RegisterButton from "./RegisterButton";

const Header = ({ session }) => {
  const navBar = session.getLoggedUser ? (
    <NavigationAuth rol={session.getLoggedUser.rol} />
  ) : (
    <NavigationNonAuth />
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
      <div className="container">{navBar}</div>
    </nav>
  );
};

const NavigationNonAuth = () => (
  <h3 className="navbar-brand text-light font-weight-bold">CRM</h3>
);

const NavigationAuth = ({ rol }) => {
  return (
    <React.Fragment>
      <Link to="/client" className="navbar-brand text-light font-weight-bold">
        CRM
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navigation"
        aria-controls="navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navigation">
        <ul className="navbar-nav ml-auto text-right">
          <li className="nav-item dropdown mr-3 mb-3 mb-lg-0 ">
            <button
              type="button"
              className="nav-link dropdown-toggle btn bnt-block btn-success"
              data-toggle="dropdown"
            >
              Clients
            </button>
            <div className="dropdown-menu" aria-labelledby="navigation">
              <Link to="/client" className="dropdown-item">
                Client List
              </Link>
              <Link to="/client/new" className="dropdown-item">
                New Client
              </Link>
            </div>
          </li>
          <li className="nav-item dropdown">
            <button
              type="button"
              className="nav-link dropdown-toggle btn bnt-block btn-success"
              data-toggle="dropdown"
            >
              Products
            </button>
            <div className="dropdown-menu" aria-labelledby="navigation">
              <Link to="/product" className="dropdown-item">
                Product List
              </Link>
              <Link to="/product/new" className="dropdown-item">
                New Product
              </Link>
            </div>
          </li>
          <Link
            to="/panel"
            className="btn bnt-block btn-info ml-md-2 mt-2 mt-md-0"
          >
            Panel
          </Link>
          {rol === "ADMIN" ? <RegisterButton /> : <React.Fragment />}
          <CloseSession />
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Header;
