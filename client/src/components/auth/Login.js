import React from "react";
import Container from "react-bootstrap/Container";
import NavHomepage from "../common/NavHomepage";
import LoginBox from "./LoginBox";
import Footer from "../common/Footer";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const Login = () => {
  return (
    <>
      <div className="login-wrapper">
        <Container fluid sticky="top" className="nav-container-pages">
          <NavHomepage />
        </Container>

        <Breadcrumb className="show-drink-breadcrumb">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Login</Breadcrumb.Item>
        </Breadcrumb>

        <LoginBox path="/" />

        <Footer />
      </div>
    </>
  );
};

export default Login;
