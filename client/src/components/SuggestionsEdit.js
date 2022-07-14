import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavHomepage from "../components/common/NavHomepage";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Container from "react-bootstrap/esm/Container";
import SuggestDrinkForm from "./helpers/SuggestDrinkForm";
import axios from "axios";
import { getTokenFromLocalStorage } from "./helpers/auth.js";
import { ImageUploadField } from "./helpers/ImageUploadField.js";
import Footer from "./common/Footer";

const SuggestionsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    drink: "",
    type: "",
    country: "",
    description: "",
    image: "",
    funFact: "",
    origin: "",
  });

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/suggested-drinks/${id}`);
      setFormData(data);
      console.log("DATA", data);
    };
    getData();
  }, [id]);

  console.log("formData", formData);

  const handleChange = (event) => {
    const updatedFormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(updatedFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/api/suggested-drinks/${id}`, formData, {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      });
      navigate.push(`/profile/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageUrl = (url) => {
    setFormData({ ...formData, image: url });
  };

  return (
    <>
      <Container fluid sticky="top" className="nav-container-pages">
        <NavHomepage />
      </Container>
      <Container className="show-drink-breadcrumb">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/profile">Profile</Breadcrumb.Item>
          <Breadcrumb.Item active>Edit</Breadcrumb.Item>
        </Breadcrumb>
        <hr />
      </Container>
      <Container className="login-register-outer-box">
        <SuggestDrinkForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleImageUrl={handleImageUrl}
          imageUploadField={ImageUploadField}
          formData={formData}
        />
      </Container>
      <Footer />
    </>
  );
};
export default SuggestionsEdit;
