import React from "react";
import "./Snackbar.css";

const Snackbar = ({ message, type }) => {
  return (
    <div className={`snackbar show ${type}`}>
      {message}
    </div>
  );
};

export default Snackbar;
