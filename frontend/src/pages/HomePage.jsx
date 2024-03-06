import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import Logo from "../images/logo.png";
import CarouselComponent from "../component/CarouselComponent";
import { PyramidMentor } from "../component/PyramidMentor";

import "./HomePage.css";
import { FaSearch } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const handleClick = () => {
    if (user) {
      navigate("/pyramid/");
    } else {
      navigate("/register/");
    }
  };

  return (
    <>
    <div>
      <Container className="d-flex flex-column">
        <Row id="row-one">
          <Col>
            <Card id="searchcard">
              <Card.Body>Search 
                <br/>
                <FaSearch />
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card id="mapcard">
              <Card.Body>
              Map
              </Card.Body>
              </Card>
          </Col>
        </Row>
        <Row id="row-two">
          <Col>
            <Card id="genpyramid">
              <Card.Body>Generate Pyramid</Card.Body>
            </Card>
          </Col>
          <Col>
            <Card id="tickcard">
              <Card.Body>
              Ticks
              </Card.Body>
              </Card>
          </Col>
        </Row>
      </Container>

    </div>
    </>
  );
};

export default HomePage;
