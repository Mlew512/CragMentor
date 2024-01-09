import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "../images/logo.png";
import background1 from "../imagesnew/FrontPage/background1.jpg";

import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="pyramid-container">
            <div className="pyramid"></div>
            <img id="home-background-img" />
            <div className="overlay-content">
              <img
                src={Logo}
                style={{
                  borderRadius: "50%"
                }}
                alt="Logo"
                className="responsive-logo"
              />
              <h1 className="white-text">Explore CragMentor</h1>
              <p className="white-text">
                Discover prime climbing spots with our advanced algorithms,
                tailored to your location, preferences, and climbing goals.
              </p>
              <p className="white-text">
                Unlock Tailored Training Plans: Personalized training plans
                featuring actual routes to enhance and elevate your climbing
                experience.
              </p>
              <p
                className="white-text"
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => navigate("/register/")}
              >
                Start Your Journey!
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
