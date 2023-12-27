import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/esm/Button';
import { api } from '../utilities';
import { useNavigate } from 'react-router-dom';
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
          <img src={Logo} style={{ width: "70px", height: "70px" }} alt="Logo" />
        </Navbar.Brand>
        <Nav className="me-auto">
          {user ? (
            <>
            <Nav.Link as={Link} to="/profile/">Profile</Nav.Link>
            <Nav.Link as={Link} to="/map/">Map</Nav.Link>
            <Nav.Link as={Link} to="/about/">About</Nav.Link>
            <Nav.Link as={Link} to="/contact/">Contact Us</Nav.Link>
            <Button onClick={()=>handleLogout()}>logout</Button>
            </>
          ) : (
            <>
            <Nav.Link as={Link} to="/about/">About</Nav.Link>
            <Nav.Link as={Link} to="/contact/">Contact Us</Nav.Link>
            <Nav.Link as={Link} to="/register/">Login</Nav.Link>
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
