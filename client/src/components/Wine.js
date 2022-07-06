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
  return (
    <>
      <Container fluid sticky="top" className="nav-container-pages">
        <NavHomepage />
      </Container>

      <Breadcrumb className="show-wine-breadcrumb">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/wine">Browse Wine</Breadcrumb.Item>
        <Breadcrumb.Item active>{wine.wine}</Breadcrumb.Item>
      </Breadcrumb>

      <Container className="show-drink" fluid>
        <div className="image-text">
          {/* <div className="image"> */}
          <img alt={wine.wine} src={wine.image} />
          {/* </div> */}
          <div className="right">
            <Container className="title" style={{ width: "100" }}>
              <h2>{wine.wine}</h2>
              <h4 className="origin">
                Origin: <span className="country-name">{wine.country}</span>
              </h4>
            </Container>
            <Container className="content" style={{ width: "100" }}>
              <h4>Description</h4>
              <p className="description">{wine.description}</p>
              <div className="info-container">
                <div className="p-container">
                  <p className="averageRating">
                    <span>Average rating: </span>
                    {wine.avgRating}
                  </p>
                  <p className="averageRating">
                    <span>Price: $</span>
                    {wine.price}
                  </p>
                  <p className="averageRating">
                    <span>Quantity: </span>
                    <input
                      name="quantity"
                      value={quantity}
                      onChange={handleChange}
                    ></input>
                  </p>
                </div>
                <Container className="buttons" fluid>
                  <Button variant="outline-warning" onClick={handleCart}>
                    Add to cart
                  </Button>{" "}
                </Container>
              </div>
            </Container>
          </div>
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default WineShow;
