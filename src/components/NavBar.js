import React from "react";
import { NavLink } from "react-router-dom";
import CustomerContext from "../Context/Context";

const NavBar = (props) => {
  const context = React.useContext(CustomerContext);
  return (
    <nav
      style={{ fontSize: "20px", fontWeight: 500 }}
      className="navbar navbar-expand-lg navbar-dark fixed-top bg-secondary"
    >
      <NavLink className="navbar-brand" to="/">
        Customers App <i className="material-icons">contact_phone</i>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav justify-content-lg-between mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home <i className="material-icons">home</i>
            </NavLink>
          </li>
          {context.token && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-customer">
                <span>
                  Add Customer <i className="material-icons">person_add</i>
                </span>
              </NavLink>
            </li>
          )}
          {context.token && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers">
                Customers <span className="material-icons">people</span>
                <b>
                  <span className="badge badge-light">
                    {context.customerCount}
                  </span>
                </b>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      <div
        style={{ marginLeft: "20%" }}
        className="collapse navbar-collapse  float-right"
        id="navbarCollapse"
      >
        <ul className="navbar-nav mr-0">
          {context.token && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/staff">
                Staff Details <span className="material-icons">people</span>
              </NavLink>
            </li>
          )}
          {context.token && (
            <li className="nav-item">
              <NavLink className="nav-link" to="#">
                {context.name} <span className="material-icons">person</span>
              </NavLink>
            </li>
          )}
          {!context.token && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">
                Signup <span className="material-icons">perm_identity</span>
              </NavLink>
            </li>
          )}
          {!context.token && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/signin">
                Signin <span className="material-icons">perm_identity</span>
              </NavLink>
            </li>
          )}
          {context.token && (
            <li onClick={props.logout} className="nav-item">
              <NavLink className="nav-link" to="/signout">
                Lougout <span className="material-icons">exit_to_app</span>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
