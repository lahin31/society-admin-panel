import React from "react";
import { NavLink } from "react-router-dom";
import "./LeftSideWrapper.scss";

const LeftSideWrapper = () => {
  return (
    <>
      <NavLink to="/societies">
        <div className="link">Societies</div>
      </NavLink>
      <NavLink to="/students">
        <div className="link">Students</div>
      </NavLink>
      <NavLink to="/create_society">
        <div className="link">Create Society</div>
      </NavLink>
    </>
  );
};

export default LeftSideWrapper;
