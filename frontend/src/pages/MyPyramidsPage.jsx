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
  console.log("the_pramid: ", pyramid)
  const the_pyramid = (
    <>
      {Array.isArray(pyramid) && pyramid.length >0 ?(
        <>
          <Row className="justify-content-center">
            <Col lg={3}>
              <Card className="text-center" onClick={()=>navigate(`/route/${pyramid[0].route_id}`)}>
                <p><i>{pyramid[0].name}</i></p>
                <h4>{pyramid[0].grade}</h4>
              </Card>
            </Col>
          </Row>
      
          <Row className="justify-content-center">
            <Col lg={3}>
              <Card className="text-center" onClick={()=>navigate(`/route/${pyramid[1].route_id}`)}>
                <p><i>{pyramid[1].name}</i></p>
                <h4>{pyramid[1].grade}</h4>
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="text-center" onClick={()=>navigate(`/route/${pyramid[2].route_id}`)}>
                <p><i>{pyramid[2].name}</i></p>
                <h4>{pyramid[2].grade}</h4>
              </Card>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col lg={3}>
              <Card className="text-center" onClick={()=>navigate(`/route/${pyramid[3].route_id}`)}>
                <p><i>{pyramid[3].name}</i></p>
                <h4>{pyramid[3].grade}</h4>
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="text-center" onClick={()=>navigate(`/route/${pyramid[4].route_id}`)}>
                <p><i>{pyramid[4].name}</i></p>
                <h4>{pyramid[4].grade}</h4>
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="text-center" onClick={()=>navigate(`/route/${pyramid[5].route_id}`)}>
                <p><i>{pyramid[5].name}</i></p>
                <h4>{pyramid[5].grade}</h4>
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="text-center" onClick={()=>navigate(`/route/${pyramid[6].route_id}`)}>
                <p><i>{pyramid[6].name}</i></p>
                <h4>{pyramid[6].grade}</h4>
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