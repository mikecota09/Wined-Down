import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavHomepage from "../common/NavHomepage";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Footer from "./Footer";

const About = () => {
  return (
    <>
      <Container fluid sticky="top" className="nav-container-pages">
        <NavHomepage />
      </Container>

      <Breadcrumb className="show-drink-breadcrumb">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>About</Breadcrumb.Item>
      </Breadcrumb>
      <Container className="about-page">
        {/* <Row>
          <Col className="about-title">About this project</Col>
        </Row> */}
        <Row>
          <Col className="about-copy">
            <>
              <p>
                Hi! 👋 We are &#8216;Wined Down Wines&#8217;, an online wine
                marketplace where you can buy all of your favorite wines, we
                hope you find what you're looking for!
              </p>
            </>
          </Col>
        </Row>
        <Row className="information">
          <Col className="names">
            <Row className="subtitle">The Wined Down Team</Row>
            <Row className="cota">
              <a
                href="https://github.com/mikecota09"
                rel="noreferrer"
                target="_blank"
              >
                <i className="fab fa-github"></i> Mike Cota
              </a>
            </Row>
            <Row className="chen">
              <a
                href="https://github.com/wangheer2010"
                rel="noreferrer"
                target="_blank"
              >
                <i className="fab fa-github"></i> Chen Wang
              </a>
            </Row>
            <Row className="wes">
              <a
                href="https://github.com/BKWes"
                rel="noreferrer"
                target="_blank"
              >
                <i className="fab fa-github"></i> Weston Barnes
              </a>
            </Row>
            <Row className="abe">
              <a
                href="https://github.com/abeshaw97"
                rel="noreferrer"
                target="_blank"
              >
                <i className="fab fa-github"></i> Abe Shaw
              </a>
            </Row>
          </Col>
          <Col className="project">
            <Row className="subtitle">Technologies Used:</Row>
            <Row>
              <ul>
                <li>JavaScript ES6</li>
                <li>HTML5</li>
                <li>SCSS</li>
                <li>React Bootstrap CSS Framework</li>
                <li>Git</li>
                <li>GitHub</li>
                <li>Express</li>
                <li>React</li>
                <li>Node</li>
                <li>Bcrypt</li>
                <li>JWT</li>
                <li>MongoDB</li>
                <li>Mongoose</li>
                <li>Trello</li>
                <li>Figma</li>
              </ul>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default About;
