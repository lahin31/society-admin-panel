import React from "react";
import { Link } from "react-router-dom";
import "./LeftSideWrapper.scss";

const LeftSideWrapper = () => {
  return (
    <>
      <Link to="/societies">
        <div className="link">Societies</div>
      </Link>
      <Link to="/students">
        <div className="link">Students</div>
      </Link>
      <Link to="/create_society">
        <div className="link">Create Society</div>
      </Link>
    </>
  );
};

export default LeftSideWrapper;
