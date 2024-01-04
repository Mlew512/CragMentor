
import { useEffect, useState } from "react";
import { api } from "../utilities";
import { Container, Row, Col, Card, CardHeader, CardBody, Form, Button } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BestCrags } from "../component/BestCrags";
import { Table } from "react-bootstrap";
import FavButton from "../component/FavButton";
import { Link } from "react-router-dom";import "./Dashboard.css"
import "./Dashboard.css"

const Dashboard =()=>{
  const {user, userProfile, setUserProfile, location, setLocation, userId, favoriteRoutes, setFavoriteRoutes} = useOutletContext();
  const navigate = useNavigate();
  const [savedPyramids, setSavedPyramids] = useState([]);
  const [searchPyramidId, setSearchPyramidId] = useState(null)
  const [pyramidRoutes, setPyramidRoutes] = useState([])
  
  
  // To get all Pyramids across users
  const getGlobalPyramids = async () => {
    try {
      const response = await api.get(`/pyramid/user/${userId}`);
      if (response.status === 200) {
        console.log(response.data)
        setSavedPyramids(response.data);
      }
      
    } catch (error) {
      console.error("Couldn't get saved pyramids:", error);
    }
  };
  // To get only user pyramids
  const getAPyramid = async () => {
    try {
      const response = await api.get(`/pyramid/${searchPyramidId}/`);
      if (response.status === 200) {
        // console.log(response.data.routes)
        setPyramidRoutes(response.data.routes)
        
      }
      
    } catch (error) {
      console.error("Couldn't get saved pyramids:", error);
    }
  };

  const handleRoute = async(id)=>{

    try{
      const response = await api.get(`/route/${id}/`)
      if(response.status ===200){
        console.log("Route Details: ", response.data.route_id)
        navigate(`/route/${response.data.route_id}/`)
      }
    }catch(error){
      console.log("did not find the route")
    }
  }
  useEffect(()=>{
    if(!user){
      navigate("/register/")
    }
    
    getGlobalPyramids();
  },[user])
 
  return (
    <>
      <Container className="d-flex flex-column">
        <Row className="text-center">
            <h3>Dashboard</h3>
        </Row>
        <Row >
          {/* Most Recent Pyramid (3)*/}
          <Col lg={6}>
            <Card>
              <CardHeader id="progress" className="text-center">Most Recent Pyramid</CardHeader>
              <CardBody>


                {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    value={searchPyramidId}
                    placeholder="Number only"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e)=>setSearchPyramidId(e.target.value)}
                  />
                  <Button variant="outline-success" onClick={getAPyramid}>Find</Button>
                </Form>
                <div className="route-ids">
                  {Array.isArray(pyramidRoutes) && pyramidRoutes.length > 0 ? (
                    pyramidRoutes.map((route) => (
                      <Button key={route} onClick={()=>handleRoute(route)}>
                        {route}
                      </Button>
                    ))
                  ) : (
                    null
                  )}
                </div> */}
              </CardBody>
            </Card>
          </Col>
          {/* Preferences */}
          <Col lg={6}>
            <Card>
              <CardHeader id="preferences" className="text-center">Preferences</CardHeader>
              <CardBody>
                  <ul style={{textDecoration:"none"}}>
                    <li>My Goal: {userProfile?.goal}</li>
                    <li>Current Location: {location?.name} </li>
                    {/* <SearchBox address={userProfile?.location} setPlace={setPlace} /> */}
                    <li>Preference Area Distance: {Math.round(userProfile?.dwtt/1609.34)} miles</li>
                  </ul>
              </CardBody>
            </Card>
          </Col>
          
        </Row>
        <Row>
          {/* Favorites */}
          <Col lg={5}>
              <Card>
                <CardHeader className="text-center">Favorites</CardHeader>
                <CardBody>
                  <Table striped>
                    <thead>
                      <tr className="text-center">
                        <th>Name</th>
                        <th>View</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(favoriteRoutes) && favoriteRoutes.length > 0 ? (
                        favoriteRoutes.map((fav, index) => (
                          <tr key={index} className="text-center">
                            <td><Link to={`/${fav.areaName != null ? 'area' : 'route'}/${fav.uuid}`}>{fav.areaName != null ? fav.areaName : fav.name}</Link></td>
                      
                            <td>View</td>
                            <td><FavButton data={fav} /></td>
                            
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          {/* Reccomended Crags */}
          <Col lg={7}>
            <Card>
              <CardHeader id="best-crags" className="text-center">Best Reccomended Crags</CardHeader>
              <CardBody>
                  <BestCrags userProfile={userProfile} location={location} setLocation={setLocation}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* <Row>
          <Col lg={8}>
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
          </Row> */}

      </Container>
    </>
  );
}

export default Dashboard;