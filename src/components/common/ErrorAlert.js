import React from "react";

const ErrorAlert = ({ message }) => {
  return (
    <p className="alert alert-danger py-3 text-center p-3 m-0">{message}</p>
  );
};

export default ErrorAlert;
