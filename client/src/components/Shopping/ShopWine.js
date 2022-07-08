import React, { useEffect, useState } from "react";
import axios from "axios";
import NavHomepage from "../common/NavHomepage.js";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";
//import CartIcon from "../../styles/images/cart.svg";
import { Link } from "react-router-dom";
// import CartTally from './CartTally.js'

const Shopwine = () => {
  const [shoppedwine, setShoppedwine] = useState([]);

  // gets data from suggested drink api
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("/api/shopped-wine");
      console.log("DATA", data);
      setShoppedwine(data);
    };
    getData();
  }, []);

  const handleDelete = (event) => {
    console.log("changed=>", event.target.value);
    const getDelete = async () => {
      const { data } = await axios.delete(
        `/api/shopped-wine/${event.target.value}`
      );
      console.log("MYDATA", data);
      if (data === "success") {
        const { data } = await axios.get("/api/shopped-wine");
        console.log("RESULT", data);
        setShoppedwine(data);
      }
    };
    getDelete();
  };

  return (
    <>
      <Container fluid sticky="top" className="nav-container-pages">
        <NavHomepage />
      </Container>
      <Container className="cart-wrapper">
        <div className="cart-style">
          <span>
            Cart
            <span className="cartlogo">{shoppedwine.length - 1}</span>
          </span>
          <Link to="/shop-wine" className="cart-link"></Link>
        </div>

        <Breadcrumb className="show-drink-breadcrumb">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/drinks">Browse Wine</Breadcrumb.Item>
          <Breadcrumb.Item active>Cart</Breadcrumb.Item>
        </Breadcrumb>
        <Container className="cartpage">
          <div className="cartpage-main">
            {shoppedwine.map((wine) => {
              if (wine !== null) {
                return (
                  <div className="cartpage-info">
                    <div className="drink-img">
                      <img src={wine[0].image}></img>
                    </div>
                    <p>{wine[0].wine}</p>
                    <p>Price: ${wine[0].price}</p>
                    <p>Quantity: {wine[1].quantity}</p>
                    <strong>
                      <p>Subtotal: ${wine[1].total}</p>
                    </strong>
                    <div>
                      <Button
                        variant="outline-warning"
                        value={wine[1]._id}
                        onClick={handleDelete}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </Container>

        <Container className="checkout">
          <Link to="/shop-confirm">
            <Button variant="warning" className="checkout-success">
              Proceed To Checkout
            </Button>
          </Link>
        </Container>
      </Container>
    </>
  );
};

export default Shopwine;
