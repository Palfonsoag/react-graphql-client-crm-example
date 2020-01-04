import React from "react";
import { Link } from "react-router-dom";

const RegisterButton = () => {
  return (
    <Link
      to="/register"
      className="btn bnt-block btn-warning ml-md-2 mt-2 mt-md-0"
    >
      Create User
    </Link>
  );
};

export default RegisterButton;
