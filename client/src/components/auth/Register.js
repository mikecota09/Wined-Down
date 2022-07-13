import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavHomepage from "../common/NavHomepage";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ImageUploadField } from "../helpers/ImageUploadField";
import Footer from "../common/Footer";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const Register = () => {
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (event) => {
    const newFormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    const newErrors = { ...errors, [event.target.name]: "" };
    setFormData(newFormData);
    setErrors(newErrors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:4001/api/register", formData);
      console.log('done registered')
      navigate("/login");
    } catch (err) {
      console.log("error response", err.response.data.errors);
      console.log("err.response", err.response);
      setErrors(err.response.data.errors);
    }

    console.log("errors", errors);
  };

  const handleImageUrl = (url) => {
    setFormData({ ...formData, image: url });
  };

  return (
    <>
      <Container fluid sticky="top" className="nav-container-pages">
        <NavHomepage />
      </Container>
      <Breadcrumb className="show-wine-breadcrumb">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Register</Breadcrumb.Item>
      </Breadcrumb>
      <Container className="login-register-outer-box">
        <h2>Register</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="fromBasicUsername">
            <Form.Control
              className={`input ${errors.username ? "danger" : ""}`}
              type="text"
              placeholder="Choose a username"
              name="username"
              onChange={handleChange}
              value={formData.username}
            />
            {errors && <p className="error">{errors.username}</p>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="fromBasicEmail">
            <Form.Control
              className={`input ${errors.email ? "danger" : ""}`}
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              className={`input ${errors.password ? "danger" : ""}`}
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={formData.password}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="fromBasicPasswordConfirmation"
          >
            <Form.Control
              className={`input ${errors.passwordConfirmation ? "danger" : ""}`}
              type="password"
              placeholder="Please confirm password"
              name="passwordConfirmation"
              onChange={handleChange}
              value={formData.passwordConfirmation}
            />
            {errors.passwordConfirmation && (
              <p className="error">{errors.passwordConfirmation.message}</p>
            )}
          </Form.Group>

          <ImageUploadField
            value={formData.image}
            name="image"
            handleImageUrl={handleImageUrl}
          />

          <Button variant="warning" type="Submit" block>
            Register
          </Button>
        </Form>

        <Link to="/login" className="login-register">
          Already a user? Login now!
        </Link>
      </Container>

      <Footer />
    </>
  );
};

export default Register
