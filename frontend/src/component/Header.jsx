import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "../images/logo.png";
import {Link} from "react-router-dom"
const Header = ({user})=>{

  return(
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand as={Link} to="/"><img src={Logo} style={{width:"70px", height:"70px"}} /></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">About</Nav.Link>
            <Nav.Link as={Link} to="/register/">Login</Nav.Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;