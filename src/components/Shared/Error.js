import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
      <div>
        <h1>Page Not Found</h1>
        <Link to="/" className="btn btn-primary">
          Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
