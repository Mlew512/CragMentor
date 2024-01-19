import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Footer.css'
import { TbWorldWww } from "react-icons/tb";
const Footer = () => {

  return (
    <Container style={{marginTop:"100px"}}>
      <Row id="footer" >
        <p>&copy; 2024 CragMentor. All rights reserved.</p>
        <p>Made possible with <a href="https://www.openbeta.io/">OpenBeta</a></p>
        
      </Row>
    </Container>
  );
};

export default Footer;
