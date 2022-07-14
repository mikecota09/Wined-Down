import React from "react";
import "./button.css";
import { Link } from "react-router-dom";

const ButtonSignup = () => {
  return (
    <Link to="/register">
      <button className="signup-btn">Sign Up</button>
    </Link>
  );
};

export default ButtonSignup;
