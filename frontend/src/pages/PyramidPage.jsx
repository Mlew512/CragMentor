import { useEffect, useState } from "react";
import "./PyramidPage.css"
import { Container, Row, Col, Card, Button, CardBody } from "react-bootstrap";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import UserForm from "../component/UserForm";
import {api} from '../utilities/api'
import { GiSaveArrow } from "react-icons/gi";
import { PyramidMentor } from "../component/PyramidMentor";

const PyramidPage = () => {
  const navigate = useNavigate();
  const { user, myPyramid, setLocation, userId, location, userProfile, lastPyramidId, setLastPyramidId} = useOutletContext();
  const { location: userLocation } = useOutletContext();
  const [pyramidId, setPyramidId] = useState(null);
  const [localUserId, setLocalUserId] = useState("")
  const [complimentMSG, setComplimentMSG] = useState(null)
  const {noUserMessage, setNoUserMessage} = useState("login to save pyramid")

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
        goal_grade: myPyramid?.goal_climb.grade
      });

      if (response.status === 201) {
        setPyramidId(response.data.pyramid_id);
        setLastPyramidId(response.data.pyramid_id);
        }
      
    } catch (error) {
      console.error("Error saving pyramid:", error);
      // alert("no crags found in that. change location and try again.")
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
        grade: route?.grade,
        area: route?.area,
        
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
  // Random Compliment when Pyramid is generated
const RandomCompliment =() =>{
    const numberArray = [
      "Send it!",
      "You got it crusher!",
      "Venga!",
      "Allez!",
      "A la muerte!",
      "がんば",
      "Excellent!",
      "Brilliant!",
      "Superb!",
      "You nailed it!"
    ];
    const randomIndex = Math.floor(Math.random() * numberArray.length);
    return numberArray[randomIndex];
  }

  useEffect(()=>{
    if (pyramidId !== null) {
      addRoutesToPyramid();
    }; 
  }, [pyramidId]);

  const the_pyramid = (
    <>
    
      <Row>
        <Card id="pyramid-container" style={{minHeight:"400px"}}>
        {!user&& <Link className="p-1" to="../register/">Login to save Pyramid</Link>}
          <CardBody  className="d-flex flex-column">
          <div style={{position:"absolute", left:"15%"}}>
            <p className="text-start px-5 m-0">{complimentMSG}</p>
            <PyramidMentor/>
          </div>
          <Row className="justify-content-center">
            <Col lg={3}>
              <Card className="pyramid-card text-center" onClick={()=>navigate(`/route/${myPyramid?.goal_climb.uuid}`)}>
                <p><i>{myPyramid?.goal_climb.area}</i></p>
                <h4>{myPyramid?.goal_climb.name} ({myPyramid?.goal_climb.grade})</h4>
                
              </Card>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col lg={3}>
              <Card className="pyramid-card text-center" onClick={()=>navigate(`/route/${myPyramid?.runner_up_1.uuid}`)}>
                <p><i>{myPyramid?.runner_up_1.area}</i></p>
              <h4>{myPyramid?.runner_up_1.name} ({myPyramid?.runner_up_1.grade})</h4>
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="pyramid-card text-center" onClick={()=>navigate(`/route/${myPyramid?.runner_up_2.uuid}`)}>
              <p><i>{myPyramid?.runner_up_2.area}</i></p>
              <h4>{myPyramid?.runner_up_2.name} ({myPyramid?.runner_up_2.grade})</h4>
              </Card>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col lg={3}>
              <Card className="pyramid-card text-center" onClick={()=>navigate(`/route/${myPyramid?.runner_up_3.uuid}`)}>
              <p><i>{myPyramid?.runner_up_3.area}</i></p>
              <h4>{myPyramid?.runner_up_3.name} ({myPyramid?.runner_up_3.grade})</h4>
                
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="pyramid-card text-center" onClick={()=>navigate(`/route/${myPyramid?.runner_up_4.uuid}`)}>
              <p><i>{myPyramid?.runner_up_4.area}</i></p>
              <h4>{myPyramid?.runner_up_4.name} ({myPyramid?.runner_up_4.grade})</h4>
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="pyramid-card text-center" onClick={()=>navigate(`/route/${myPyramid?.runner_up_5.uuid}`)}>
              <p><i>{myPyramid?.runner_up_5.area}</i></p>
              <h4>{myPyramid?.runner_up_5.name} ({myPyramid?.runner_up_5.grade})</h4>
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="pyramid-card text-center" onClick={()=>navigate(`/route/${myPyramid?.runner_up_6.uuid}`)}>
              <p><i>{myPyramid?.runner_up_6.area}</i></p>
              <h4>{myPyramid?.runner_up_6.name} ({myPyramid?.runner_up_6.grade})</h4>
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
      <Container className="d-flex flex-column pt-3">
        <Row className="justify-content-center text-center">
          <Col lg={2} className="d-flex">
              <UserForm location={userLocation} setLocation={setLocation} />
              {user &&
                <Button variant= "transparent" onClick={handleSavePyramid}><GiSaveArrow size={25}/></Button> }
          </Col>
        </Row>
        {myPyramid ? (
          <> 
            {the_pyramid}
          </>
        ) : (
          <>
          
          <Row>
            <Card id="pyramid-container" style={{minHeight:"400px"}}>
                <CardBody className="d-flex justify-content-center align-items-center">
                <PyramidMentor id="pyramid-mentor" />
                <p className="pyramid-text">Yo I'm Pyramid-Mentor, create your pyramid here...</p>
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




