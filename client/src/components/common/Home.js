import React, { useState } from "react";
import NavHomepage from "../common/NavHomepage";
import { Link } from "react-router-dom";
// import AnimatedMap from './AnimatedMap.js'
import Container from "react-bootstrap/Container";
import style from "../../styles/images/1.png";
import Happy from "../../styles/images/2.png";
import Need from "../../styles/images/3.png";
import Choose from "../../styles/images/4.png";
import Receive from "../../styles/images/5.png";
import Button from "react-bootstrap/Button";
import Figure from "react-bootstrap/Figure";
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Carousel from 'react-bootstrap/Carousel'
import greentea from "../../styles/images/6.png";
import ladywines from "../../styles/images/7.png";
import manwines from "../../styles/images/8.png";
import crossleg from "../../styles/images/9.png";
import { Modal } from "react-bootstrap";
// import bighair from '../../styles/images/bighair.png'
// import footer from '../../styles/images/footer.png'
//import LoginBox from "../auth/LoginBox";
import Footer from "./Footer";

const Home = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <>
      <div className="homepage">
        <Container fluid className="hero">
          <NavHomepage />
          <div className="hot">
            <h2 className="hero-title">
              Taste Wines
              <br />
              from Europe and America
            </h2>
            <div>
              <div className="paragraph">
                <p>All you can taste</p>
                <div className="hero-buttons">
                  <Modal size="lg" show={show} onHide={handleClose}>
                    <Modal.Header>
                      <Modal.Title>Please log in to suggest a wine</Modal.Title>
                    </Modal.Header>

                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <Link to="/wines">
                    <Button variant="warning">
                      <span>Shop All Wines</span>
                    </Button>{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <Figure className="zig-zag">
          <Figure.Image alt="zig-zag" src={style} />
        </Figure>

        <Container className="divider"></Container>

        <Container fluid className="choice">
          <Row>
            <Col xs={12} md={8}>
              <div className="choice-wrapper">
                <div className="wine">
                  <h2>
                    Red Or White
                    <br />
                    We have all you want
                  </h2>
                </div>
                <div className="covered">
                  <p>
                    This is Wined Down
                    <br />
                    We are your personal marketplace to add to your cellars
                  </p>
                </div>
              </div>

              <CardGroup>
                <Card
                  style={{ width: "20rem" }}
                  className="need-choose-receive"
                >
                  <Card.Img variant="top" />
                  <Figure.Image alt="Need" src={Need} />
                  <Card.Body>
                    <Card.Title>1. Need</Card.Title>
                    <Card.Text>Quality Wines</Card.Text>
                  </Card.Body>
                </Card>

                <Card
                  style={{ width: "20rem" }}
                  className="need-choose-receive"
                >
                  <Card.Img variant="top" />
                  <Figure.Image alt="Choose" src={Choose} />
                  <Card.Body>
                    <Card.Title>2. Choose</Card.Title>
                    <Card.Text>
                      From Carefully <br /> Curated Products
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card
                  style={{ width: "20rem" }}
                  className="need-choose-receive"
                >
                  <Card.Img variant="top" />
                  <Figure.Image alt="Receive" src={Receive} />
                  <Card.Body>
                    <Card.Title>3. Receive</Card.Title>
                    <Card.Text>Within Minutes</Card.Text>
                  </Card.Body>
                </Card>
              </CardGroup>
            </Col>
            <Col xs={12} md={4}>
              <div className="happy">
                <Figure.Image alt="Happy" src={Happy} />
              </div>
            </Col>
          </Row>
        </Container>

        <Container fluid className="room">
          <div className="heiss-room">
            <h2>Tasting Room</h2>
            <div className="heiss-room-copy">
              <p>See what others recommend</p>
            </div>
          </div>

          <Container className="heiss-img-wrapper">
            <div className="heiss-img">
              <img className="heiss-img" alt="greentea" src={greentea} />
            </div>
            <div>
              <img className="heiss-img" alt="ladywines" src={ladywines} />
            </div>
            <div>
              <img className="heiss-img" alt="manwines" src={manwines} />
            </div>
            <div>
              <img className="heiss-img" alt="manwines" src={crossleg} />
            </div>
          </Container>

          <div className="paragraph">
            <Link to="/register">
              <Button variant="warning" className="button">
                Join Our Community
              </Button>{" "}
            </Link>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};
export default Home;
