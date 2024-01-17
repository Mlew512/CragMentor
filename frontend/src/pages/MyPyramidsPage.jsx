import { useNavigate, useOutletContext } from "react-router-dom";
import PyramidTable from "../component/PyramidTable";
import { Row, Col, Card, CardBody, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import {api} from '../utilities/api' 
import { Link } from "react-router-dom";
import { PyramidMentor } from "../component/PyramidMentor";


const MyPyramidsPage =()=>{
  const {user, userId} = useOutletContext();
  const navigate = useNavigate();
  const [pyramid, setPyramid] = useState(null)

  useEffect(()=>{
    if(!user){
      navigate("/register/")
    }
  },[user, pyramid])

  console.log("the_pramid: ", pyramid)
  
  const the_pyramid = (
    <>
      {Array.isArray(pyramid) && pyramid.length >0 ?(
        <>
        <Row>
          <Card id="pyramid-container" style={{minHeight:"400px"}}>
            <CardBody className="d-flex flex-column">
            <div style={{position:"absolute", right:"10%"}}>
            <p className="text-end m-0 px-5">Way To Go!</p>
            <PyramidMentor/>
            </div>
            <Row className="justify-content-center">
              <Col lg={3}>
                <Card className="pyramid-card text-center" onClick={()=>navigate(`/route/${pyramid[0].route_id}`)}>
                  <p><i>{pyramid[0].name}</i></p>
                  <h4>{pyramid[0].grade}</h4>
                </Card>
              </Col>
            </Row>
        
            <Row className="justify-content-center">
              <Col lg={3}>
                <Card className="pyramid-card text-center" onClick={()=>navigate(`/route/${pyramid[1].route_id}`)}>
                  <p><i>{pyramid[1].name}</i></p>
                  <h4>{pyramid[1].grade}</h4>
                </Card>
              </Col>
              <Col lg={3}>
                <Card className="pyramid-card text-center" onClick={()=>navigate(`/route/${pyramid[2].route_id}`)}>
                  <p><i>{pyramid[2].name}</i></p>
                  <h4>{pyramid[2].grade}</h4>
                </Card>
              </Col>
            </Row>

            <Row className=" justify-content-center">
              <Col lg={3}>
                <Card className="pyramid-card text-center" onClick={()=>navigate(`/route/${pyramid[3].route_id}`)}>
                  <p><i>{pyramid[3].name}</i></p>
                  <h4>{pyramid[3].grade}</h4>
                </Card>
              </Col>
              <Col lg={3}>
                <Card className="pyramid-card text-center" onClick={()=>navigate(`/route/${pyramid[4].route_id}`)}>
                  <p><i>{pyramid[4].name}</i></p>
                  <h4>{pyramid[4].grade}</h4>
                </Card>
              </Col>
              <Col lg={3}>
                <Card className="pyramid-card text-center" onClick={()=>navigate(`/route/${pyramid[5].route_id}`)}>
                  <p><i>{pyramid[5].name}</i></p>
                  <h4>{pyramid[5].grade}</h4>
                </Card>
              </Col>
              <Col lg={3}>
                <Card className="pyramid-card text-center" onClick={()=>navigate(`/route/${pyramid[6].route_id}`)}>
                  <p><i>{pyramid[6].name}</i></p>
                  <h4>{pyramid[6].grade}</h4>
                </Card>
              </Col>
            </Row>
            </CardBody> 
          </Card>
        </Row>
        </>
      ):(
        null
      )}

    </>
  );

  return(
    <>
    <Container className="d-flex flex-column">
    <Row>
      {pyramid ? the_pyramid : (
          <>
          
          <Row>
            <Card id="pyramid-container" style={{minHeight:"400px"}}>
                <CardBody className="d-flex justify-content-center align-items-center">
                <p>Click "View" to view your saved pyramid here.</p>
                <PyramidMentor/>
                </CardBody>
            </Card>
          </Row>
          </>
        )}
    </Row>
    <PyramidTable userId={userId} setPyramid={setPyramid}/>
    </Container>
    </>
  );
}

export default MyPyramidsPage;