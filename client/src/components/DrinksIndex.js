import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavHomepage from "./common/NavHomepage";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import DisplayDrinks from "./index/_DisplayDrinks.js";
import DisplayChecked from "./index/_DisplayChecked.js";
import Footer from "./common/Footer";

const DrinksIndex = () => {
  const [drinks, setDrinks] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState(drinks);
  const [filteredOrigins, setFilteredOrigins] = useState(drinks.origin);
  const [hasError, setHasError] = useState(false);
  const typesOfDrinks = ["All"];
  const placesOfOrigin = ["All"];
  let type = "All";
  let origin = "All";
  const searchDrinks = "";
  const searchOrigin = "";

  //* request to API on first render
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get("/api/drinks");
        setDrinks(data);
      } catch (err) {
        setHasError(true);
      }
    };
    getData();
  }, []);

  //* default display for 'All' drink types
  const getTypes = () => {
    drinks.foreach((drink) => {
      if (!typesOfDrinks.includes(drink.type)) {
        typesOfDrinks.push(drink.type);
      }
    });
  };

  //* filter drinks
  const filterDrinks = () => {
    const regexSearch = new RegExp(searchDrinks, "i");
    console.log("regenSearch ->", regexSearch);
    const filteredArray = drinks.filter((drink) => {
      return (
        regexSearch.test(drink.drink) && (drink.type === type || type === "All")
      );
    });
    setFilteredDrinks(filteredArray);
    console.log("DRINKS ARRAY FILTERED->", filteredArray); //here data passed fine
  };

  // * sets type whe checkbox is handleChecked

  const handleChecked = (event) => {
    type = event.target.value;
    filterDrinks();
    console.log("BUTTONS EVENT TARGET VALUE ->", event.target.value);
  };

  // * default display for 'All' origin regions

  const getOrigins = () => {
    drinks.foreach((drink) => {
      if (!placesOfOrigin.includes(drink.origin)) {
        placesOfOrigin.push(drink.origin);
      }
    });
  };

  // * filter drinks
  const filterOrigins = () => {
    const regexSearch = new RegExp(searchOrigin, "i");
    console.log("regenSearch ->", regexSearch);
    const filteredArray = drinks.filter((drink) => {
      return (
        regexSearch.test(drink.drink) &&
        (drink.origin === origin || origin === "All")
      );
    });
    setFilteredOrigins(filteredArray);
    console.log("ORIGINS ARRAY FILTERED->", filteredArray); // nothing in this filtered array
  };

  // * sets origin when dropdown selected

  const handleChosenOrigin = (event) => {
    origin = event.target.value;
    filterOrigins();
    console.log("DROPDOWN EVENT TARGET VALUE ->", event.target.value);
  };

  getTypes();
  getOrigins();

  return (
    <>
      <Container fluid sticky="top" className="nav-container-pages">
        <NavHomepage />
      </Container>
      <Container className="index-wrapper">
        <Row className="align-items-center index-hero-row">
          <Col className="index-hero-txt">
            <h2>Fresh brew</h2>
            <article>
              <p>
                Discover your new favourite brew with Teas and Coffees that you
                didnt even know existed. Browse our a range of tastes and
                preparation methods you’ll love, and choose the right new brew
                for you.
              </p>
            </article>
          </Col>
          <Col className="index-hero-img"></Col>
        </Row>
        {/* Breadcrumbs for navigation */}
        <Breadcrumb className="show-drink-breadcrumb">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Browse Drinks</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          {drinks ? (
            <>
              <DisplayChecked
                typesOfDrinks={typesOfDrinks}
                handleChecked={handleChecked}
                handleChosenOrigin={handleChosenOrigin}
                placesOfOrigin={placesOfOrigin}
              />
              <hr className="grey-breakline"></hr>
              <Container className="api-wrapper">
                <Row className="api-section">
                  <DisplayDrinks
                    drinks={drinks}
                    filteredDrinks={filteredDrinks}
                    filteredOrigins={filteredOrigins}
                  />
                </Row>
              </Container>
            </>
          ) : (
            <h3>{hasError ? "Oops,. something went wrong!" : "Loading..."}</h3>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};
export default DrinksIndex;
