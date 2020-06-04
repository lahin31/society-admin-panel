import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthContext from "../../contexts/auth-context";
import "./Navigation.css";

const Navigation = (props) => {
  const context = useContext(AuthContext);
  const handleLogout = () => {
    context.logout();
    props.history.push("/login");
  };
  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <Link to={"/"}>
          <h1 className="main-navigation__heading">Recipe App Admin Panel</h1>
        </Link>
      </div>
      <nav className="main-navigation__items">
        <ul>
          {!context.token && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {context.token && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(Navigation);
