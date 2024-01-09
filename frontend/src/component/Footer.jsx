import { Container, Row } from "react-bootstrap";
import './Footer.css'
const Footer = () => {

  return (
    <Container style={{marginTop:"100px"}}>
      <Row id="footer" >
        <p>&copy; 2023 CragMentor. All rights reserved.</p>
      </Row>
    </Container>
  );
};

export default Footer;
