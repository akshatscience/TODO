import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, getSignout } from "./user/userhelper";
import "./nav.css";
import { createTodos } from "./todos/todoshelper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#FFFFFF" };
  } else {
    return { color: "#2ee3d" };
  }
};

const Menu = ({ history }) => {
  return (
    <div className="navigation">
      <ul className="nav nav-tabs nav-info justify-content-end">
        <li className="nav-item">
          <Link style={currentTab(history, "/")} className="nav-link" to="/">
            Home
          </Link>
        </li>
        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signup")}
                className="nav-link"
                to="/signup"
              >
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/login")}
                className="nav-link"
                to="/login"
              >
                Login
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link text-lg"
                onClick={() => {
                  getSignout(() => {
                    history.push("/");
                  });
                }}
              >
                Signout
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-lg" to="/login/todos">
                Todos
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </div>
  );
};
export default withRouter(Menu);
