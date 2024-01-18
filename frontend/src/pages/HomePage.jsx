import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "../images/logo.png";
import CarouselComponent from "../component/CarouselComponent";


import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
    {/* <img id="home-background-img" /> */}
    
 

    <>
      <Container fluid>
        {/* <CarouselComponent/> */}
        <Row>
          <Col>
            <div className="pyramid-container">
              <div className="pyramid"></div>
              <div className="overlay-content">
                <img
                  src={Logo}
                  style={{
                    borderRadius: "50%"
                  }}
                  alt="Logo"
                  className="responsive-logo"
                /> 
                <h1 className="white-text">CragMentor</h1>
                <p className="white-text">
                  Create a Climbing Training Pyramid with our algorithm which selects the best climbs for you!
                </p>
                <p className="white-text">
                  Find the Best Crags near you tailored you your skill level and climbing goals! 
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
    </>
    </>
    );
  };

  export default HomePage;
