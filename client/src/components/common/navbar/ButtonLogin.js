import React from "react";
import "./button.css";
import { Link } from "react-router-dom";

const ButtonLogin = () => {
  return (
    <Link to="/login">
      <button className="login-btn">Login</button>
    </Link>
  );
};

export default ButtonLogin;
