import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/esm/Button';
import { api } from '../utilities';

import "./Header.css"

const Header = ({ user, setUser}) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await api.post("users/logout");
      if (response.status === 204) {
        setUser(null);
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        navigate("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const commonNavbar = (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} style={{ width: "70px", height: "70px", borderRadius:"50px"}} alt="Logo" />
        </Navbar.Brand>
        <Nav className="me-auto">
          {user ? (
            <>
            <Nav.Link as={Link} to="/profile/">Profile</Nav.Link>
            <Nav.Link as={Link} to="/map/">Map</Nav.Link>
            <Nav.Link as={Link} to="/about/">About</Nav.Link>
            <Nav.Link as={Link} to="/contact/">Contact Us</Nav.Link>
            <Button onClick={()=>handleLogout()}>Log Out</Button>
            </>
          ) : (
            <>
            <Nav.Link as={Link} to="/about/">About</Nav.Link> 
            <Nav.Link as={Link} to="/contact/">Contact Us</Nav.Link> 
            <Nav.Link as={Link} to="/register/">Log In</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );

  return (
    <>
      {user ? commonNavbar : commonNavbar}
    </>
  );
}

export default Header;
