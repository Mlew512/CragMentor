
import { useEffect, useState } from "react";
import { api } from "../utilities";
import { Container, Row, Col, Card, CardHeader, CardBody } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BestCrags } from "../component/BestCrags";
import SearchBox from "../component/SearchBox";
import { Table } from "react-bootstrap";
import FavButton from "../component/FavButton";
import { Link } from "react-router-dom";
const Dashboard =()=>{
  const {user, userProfile, setUserProfile, location, favoriteRoutes, setFavoriteRoutes} = useOutletContext();
  const navigate = useNavigate();
  const [savedPyramids, setSavedPyramids] = useState([]);
  
  // const [place, setPlace] = useState(null)

  useEffect(()=>{
    console.log(favoriteRoutes)
  },[favoriteRoutes])


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
                    <li>Current Location: {location.name} </li>
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
                  <BestCrags userProfile={userProfile} location={location}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
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
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;