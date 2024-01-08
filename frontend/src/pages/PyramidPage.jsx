import { useEffect, useState } from "react";
import "./PyramidPage.css"
import { Container, Row, Col, Card, Button, CardBody } from "react-bootstrap";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import UserForm from "../component/UserForm";
import {api} from '../utilities/api'
import { GiSaveArrow } from "react-icons/gi";
import PyramidTable from "../component/PyramidTable";

const PyramidPage = () => {
  const navigate = useNavigate();
  const { user, myPyramid, setLocation, userId, location, userProfile} = useOutletContext();
  const { location: userLocation } = useOutletContext();
  const [pyramidId, setPyramidId] = useState(null);
  const [localUserId, setLocalUserId] = useState("")

  

  useEffect(() => {
    if (!user) {
      navigate("/register/");
    }
  }, [user, myPyramid]);

  const handleSavePyramid = async () => {
    const user_id = localStorage.getItem("user_id")
    try {
      const requestData = {
        pyramidData: myPyramid,
        userLocation: userLocation,
      };
      console.log(location)
      const response = await api.post("/pyramid/", {
        // change into location instead of lat long
        user: user_id,
        location: location.name,
        latitude: location.lat,
        longitude: location.lng,
        goal_grade: userProfile.goal
      });

      if (response.status === 201) {
        // alert(`Pyramid with id: ${response.data.pyramid_id} saved successfully`);
        // console.log(typeof(myPyramid.goal_climb.uuid), myPyramid.goal_climb.name)
        setPyramidId(response.data.pyramid_id);
        }
      
    } catch (error) {
      console.error("Error saving pyramid:", error);
      alert("no crags found in that. change location and try again.")
    }
    };

  const addRoutesToPyramid = async()=> {
    const user_id = localStorage.getItem("user_id")
    for (const routeKey in myPyramid){
      const route = myPyramid[routeKey];
      try{
        const response = await api.post("/route/",{
        pyramid_id: pyramidId,
        route_id: route?.uuid ,
        name: route?.name,
        grade: route?.grade
        
      })
      if (response.status ===201){
        console.log("route created")
        console.log(response.data.routes)
        if ((response.data.routes).length == 7) { // Assuming routeKey is a numeric index starting from 0
          // Navigate once the 7th route is added
          navigate("../mypyramids");
        }
      }
      }catch(error){
        console.log("Did not save route")
      }
    }
  }

  useEffect(()=>{
   addRoutesToPyramid(); 
  }, [pyramidId]);

  const the_pyramid = (
    <>
      <Row>
        <Card style={{minHeight:"400px"}}>
          <CardBody className="d-flex flex-column">

          <Row className="justify-content-center">
            <Col lg={3}>
              <Card className="text-center" onClick={()=>useNavigate(`/route/${myPyramid?.goal_climb.uuid}`)}>
                <p><i>{myPyramid?.goal_climb.name}</i></p>
                <h4>{myPyramid?.goal_climb.grade}</h4>
              </Card>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col lg={3}>
              <Card className="text-center" onClick={()=>useNavigate(`/route/${myPyramid?.runner_up_1.uuid}`)}>
                <p><i>{myPyramid?.runner_up_1.name}</i></p>
                <h4>{myPyramid?.runner_up_1.grade}</h4>
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="text-center" onClick={()=>useNavigate(`/route/${myPyramid?.runner_up_2.uuid}`)}>
                <p><i>{myPyramid?.runner_up_2.name}</i></p>
                <h4>{myPyramid?.runner_up_2.grade}</h4>
              </Card>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col lg={3}>
              <Card className="text-center" onClick={()=>useNavigate(`/route/${myPyramid?.runner_up_3.uuid}`)}>
                <p><i>{myPyramid?.runner_up_3.name}</i></p>
                <h4>{myPyramid?.runner_up_3.grade}</h4>
                
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="text-center" onClick={()=>useNavigate(`/route/${myPyramid?.runner_up_4.uuid}`)}>
                <p><i>{myPyramid?.runner_up_4.name}</i></p>
                <h4>{myPyramid?.runner_up_4.grade}</h4>
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="text-center" onClick={()=>useNavigate(`/route/${myPyramid?.runner_up_5.uuid}`)}>
                <p><i>{myPyramid?.runner_up_5.name}</i></p>
                <h4>{myPyramid?.runner_up_5.grade}</h4>
        
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="text-center" onClick={()=>useNavigate(`/route/${myPyramid?.runner_up_6.uuid}`)}>
                <p><i>{myPyramid?.runner_up_6.name}</i></p>
                <h4>{myPyramid?.runner_up_6.grade}</h4>
                
              </Card>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Row>
    </>

  );
  return (
    <>
      <Container className="d-flex flex-column">
        <Row className="justify-content-center text-center">
          <Col lg={2} className="d-flex">
            {/* <Card className="d-flex flex-row justify-content-around"> */}
              <UserForm location={userLocation} setLocation={setLocation} />
              <Button variant= "transparent" onClick={handleSavePyramid}><GiSaveArrow size={25}/></Button>
            {/* </Card> */}
          </Col>
        </Row>
        {myPyramid ? (
          <>
            {the_pyramid}
          </>
        ) : (
          <>
          
          <Row>
            <Card style={{minHeight:"400px"}}>
                <CardBody className="d-flex justify-content-center align-items-center">
                  Please Generate Your Pyramid
                </CardBody>
            </Card>
          </Row>
          </>
        )}
        
      </Container>
    </>
  );
};

export default PyramidPage;




