
import { useEffect, useState } from "react";
import { api } from "../utilities";
import { Container, Row, Col, Card, CardHeader, CardBody } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BestCrags } from "../component/BestCrags";



const Dashboard =()=>{
  const {user, userProfile, setUserProfile, location, setLocation} = useOutletContext();
  const navigate = useNavigate();
  const [savedPyramids, setSavedPyramids] = useState([]);
  
  // const [place, setPlace] = useState(null)

  // useEffect(()=>{
  //   if(place){
  //     setUserProfile(userProfile => ({...userProfile, location: place["name"]}))
  //   }
  // },[place])


  const getSavedRoutes = async()=>{
    try{
      const response = await api.get("/route/")
      if(response.status ===200){
        console.log(response.data)
      }
    }catch(error){
      console.log("Couldn't get routes")
      console.log("Something Bad happened")
    }
  }

  const getSavedPyramids = async () => {
    try {
      const response = await api.get("/pyramid/");
      if (response.status === 200) {
        setSavedPyramids(response.data);
      }
    } catch (error) {
      console.error("Couldn't get saved pyramids:", error);
    }
  };

  useEffect(()=>{
    if(!user){
      navigate("/register/")
    }
    getSavedRoutes();
    getSavedPyramids();
  },[user])

  return (
    <>
      <Container className="d-flex flex-column">
        <Row className="text-center">
            <h3>Dashboard</h3>
        </Row>
        <Row >
          <Col lg={6}>
            <Card>
              <CardHeader className="text-center">Preferences</CardHeader>
              <CardBody>
                  <ul style={{textDecoration:"none"}}>
                    <li>My Goal: {userProfile?.goal}</li>
                    <li>Grade: {userProfile?.current_level}</li>
                    <li>Current Location: {location?.name} </li>
                    {/* <SearchBox address={userProfile?.location} setPlace={setPlace} /> */}
                    <li>Preference Area Distance: {userProfile?.dwtt}</li>
                  </ul>
              </CardBody>
            </Card>
          </Col>
    
          <Col lg={6}>
            <Card>
              <CardHeader className="text-center">Progress</CardHeader>
              <CardBody>
                  <ul style={{textDecoration:"none"}}>
                    <li>V1: </li>
                    <li>V2: </li>
                    <li>V3:  </li>
                    {/* <SearchBox address={userProfile?.location} setPlace={setPlace} /> */}
                    <li>V4: </li>
                  </ul>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={3}>
            <Card>
              <CardHeader className="text-center">Saved Pyramids</CardHeader>
              <CardBody>
                {savedPyramids.map((pyramid, index) => (
                  <div key={index}>
                    <Link to={`/pyramid${index + 1}`}>Pyramid #{index + 1}</Link>
                  </div>
                ))}
              </CardBody>
            </Card>
          </Col>
          <Col lg={9}>
            <Card>
              <CardHeader className="text-center">Best Reccomended Crags</CardHeader>
              <CardBody>
                  <BestCrags userProfile={userProfile} location={location} setLocation={setLocation}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;