import { useEffect } from "react";
import "./PyramidPage.css"
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import UserForm from "../component/UserForm";
const PyramidPage = () => {
  const navigate = useNavigate();
  const { user, myPyramid } = useOutletContext();
  const list = [0,1,2,3,4,5,6]
 
  useEffect(() => {
    if (!user) {
      navigate("/register/");
    }
  }, [user, myPyramid]);

  const the_pyramid = (
    <>
      <Row className="justify-content-center">
        <Col lg={3}>
        <Card className="text-center">
          <h5>{myPyramid?.goal_climb.name}</h5>
          <Card.Footer>{myPyramid?.goal_climb.grade}</Card.Footer>
        </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={3}>
        <Card  className="text-center">
          <h5>{myPyramid?.runner_up_1.name}</h5>
          <Card.Footer>{myPyramid?.runner_up_1.grade}</Card.Footer>
        </Card>
        </Col>
        <Col lg={3}>
        <Card className="text-center">
          <h5>{myPyramid?.runner_up_2.name}</h5>
          <Card.Footer>{myPyramid?.runner_up_2.grade}</Card.Footer>
        </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={3}>
        <Card className="text-center">
          <h5>{myPyramid?.runner_up_3.name}</h5>
          <Card.Footer>{myPyramid?.runner_up_3.grade}</Card.Footer>
        </Card>
        </Col>
        <Col lg={3}>
        <Card className="text-center">
          <h5 >{myPyramid?.runner_up_4.name}</h5>
          <Card.Footer>{myPyramid?.runner_up_4.grade}</Card.Footer>
        </Card>
        </Col>
        <Col lg={3}>
        <Card className="text-center">
          <h5 >{myPyramid?.runner_up_5.name}</h5>
          <Card.Footer>{myPyramid?.runner_up_5.grade}</Card.Footer>
        </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg={3}>
        <Card className="text-center">
          <h5>{myPyramid?.runner_up_6.name}</h5>
          <Card.Footer>{myPyramid?.runner_up_6.grade}</Card.Footer>
        </Card>
        </Col>
      </Row>
    </>
  );
  return (
    <>
    <Container className="d-flex flex-column">
      <Row className="justify-content-center">
        <Col lg={4}>
        <Card>
          <UserForm/>
        </Card>
        </Col>
      </Row>
      {myPyramid? (
        the_pyramid
        ):(
       null
      )}
      
    </Container>
    </>
  );
};

export default PyramidPage;
