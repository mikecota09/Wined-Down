import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavHomepage from "./common/NavHomepage";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Footer from "./common/Footer";

const WineShow = () => {
  const [wine, setWine] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/wine/${id}`);
        setWine(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [id]);
  console.log(wine);

  const handleChange = (event) => {
    console.log("changed=>", event.target.value);
    setQuantity(event.target.value);
  };

  const handleCart = async (event) => {
    event.preventDefault();
    const total = quantity * wine.price;
    const formData = {
      drinkId: wine._id,
      quantity: parseInt(quantity),
      price: wine.price,
      total: total,
    };

    console.log("My form data=>", formData);

    try {
      await axios.post(
        `/api/shopped-wine/${wine._id}`,
        formData
        // {
        //   headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        // }
      );
      history.push("/shop-wine");
    } catch (err) {
      console.log(err);
    }
  };
};
