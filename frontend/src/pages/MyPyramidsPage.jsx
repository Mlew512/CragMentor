import { useNavigate, useOutletContext } from "react-router-dom";
import PyramidTable from "../component/PyramidTable";
import { Row, Col, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import {api} from '../utilities/api'
import { Link } from "react-router-dom";

const MyPyramidsPage =()=>{
  const {user, userId} = useOutletContext();
  const navigate = useNavigate();
  const [pyramid, setPyramid] = useState(null)
  
  useEffect(()=>{
    if(!user){
      navigate("/register/")
    }
  },[user, pyramid])

  const the_pyramid = (
    <>
      {Array.isArray(pyramid) && pyramid.length >0 ?(
        <>
          <Row className="justify-content-center">
            <Col lg={3}>
              <Card className="text-center">
                <Link to={`/route/${pyramid[0].routes_id}`}>
                  <h5>{pyramid[0].name}</h5>
                </Link>
                <Card.Footer>{pyramid[0].grade}</Card.Footer>
              </Card>
            </Col>
          </Row>
      
          <Row className="justify-content-center">
            <Col lg={3}>
              <Card className="text-center">
                <Link to={`/route/${pyramid[1].routes_id}`}>
                  <h5>{pyramid[1].name}</h5>
                </Link>
                <Card.Footer>{pyramid[1].grade}</Card.Footer>
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="text-center">
                <Link to={`/route/${pyramid[2].routes_id}`}>
                  <h5>{pyramid[2].name}</h5>
                </Link>
                <Card.Footer>{pyramid[2].grade}</Card.Footer>
              </Card>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col lg={3}>
              <Card className="text-center">
                <Link to={`/route/${pyramid[3].routes_id}`}>
                  <h5>{pyramid[3].name}</h5>
                </Link>
                <Card.Footer>{pyramid[3].grade}</Card.Footer>
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="text-center">
                <Link to={`/route/${pyramid[4].routes_id}`}>
                  <h5>{pyramid[4].name}</h5>
                </Link>
                <Card.Footer>{pyramid[4].grade}</Card.Footer>
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="text-center">
              <Link to={`/route/${pyramid[5].routes_id}`}>
                  <h5>{pyramid[5].name}</h5>
                </Link>
                <Card.Footer>{pyramid[5].grade}</Card.Footer>
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="text-center">
                <Link to={`/route/${pyramid[6].routes_id}`}>
                  <h5>{pyramid[6].name}</h5>
                </Link>
                <Card.Footer>{pyramid[6].grade}</Card.Footer>
              </Card>
            </Col>
          </Row>
        </>
      ):(
        null
      )}

    </>
  );
  console.log(pyramid)
  return(
    <>
    <Row>
      {the_pyramid ? the_pyramid : null}
    </Row>
    <PyramidTable userId={userId} setPyramid={setPyramid}/>
    </>
  );
}

export default MyPyramidsPage;