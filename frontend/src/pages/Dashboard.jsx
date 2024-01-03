
import { useEffect, useState } from "react";
import { api } from "../utilities";
import { Container, Row, Col, Card, CardHeader, CardBody } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BestCrags } from "../component/BestCrags";

import "./Dashboard.css"

const Dashboard =()=>{
  const {user, userProfile, location, setLocation, userId} = useOutletContext();
  const navigate = useNavigate();
  const [savedPyramids, setSavedPyramids] = useState([]);

  // To get all Pyramids across users
  const getGlobalPyramids = async () => {
    try {
      const response = await api.get(`/pyramid/`);
      if (response.status === 200) {
        // console.log(response.data)
        setSavedPyramids(response.data);
      }
      
    } catch (error) {
      console.error("Couldn't get saved pyramids:", error);
    }
  };
  // To get only user pyramids
  const getMyPyramids = async () => {
    try {
      const response = await api.get(`/pyramid/${userId}`);
      if (response.status === 200) {
        console.log(response.data)
        // setSavedPyramids(response.data);
      }
      
    } catch (error) {
      console.error("Couldn't get saved pyramids:", error);
    }
  };

  useEffect(()=>{
    if(!user){
      navigate("/register/")
    }
    
    getMyPyramids();
    getGlobalPyramids();
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
              <CardHeader id="preferences" className="text-center">Preferences</CardHeader>
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
              <CardHeader id="progress" className="text-center">Your Saved Pyramid</CardHeader>
              <CardBody>
                
                  
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            <Card>
              <CardHeader id="saved-pyramids" className="text-center">People Also Saved</CardHeader>
              <CardBody>
                {Array.isArray(savedPyramids) && savedPyramids.length > 0 ? (
                 savedPyramids.map((pyramid) => (
                  <tr key={pyramid.id} className="text-center">
                    <td>id: {pyramid.id} | </td>
                    <td>{pyramid.goal_grade} | </td>
                    <td>{pyramid.date_generated}</td>
                  </tr>
                ))
                ):(
                  <td>{Array.isArray(savedPyramids) && savedPyramids > 0 ? savedPyramids : "nothing"}</td>
                  )}
              </CardBody>
            </Card>
          </Col>
          <Col lg={7}>
            <Card>
              <CardHeader id="best-crags" className="text-center">Best Reccomended Crags</CardHeader>
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