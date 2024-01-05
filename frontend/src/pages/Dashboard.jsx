import { useEffect, useState } from "react";
import { api } from "../utilities";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  Button,
} from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BestCrags from "../component/BestCrags";
import { Table } from "react-bootstrap";
import FavButton from "../component/FavButton";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import "./Dashboard.css";
import handleAPyramid from "../component/PyramidTable";

const Dashboard = () => {
  const {
    user,
    userProfile,
    setUserProfile,
    location,
    setLocation,
    userId,
    favoriteRoutes,
    setFavoriteRoutes,
  } = useOutletContext();
  const navigate = useNavigate();
  const [savedPyramid, setSavedPyramid] = useState([]);
  const [searchPyramidId, setSearchPyramidId] = useState(null);

  // To get all Pyramids across users
  const getUserPyramids = async () => {
    try {
      const response = await api.get(`/pyramid/user/${userId}`);
      if (response.status === 200) {
        console.log(response.data);
        setSavedPyramid(response.data);
      }
    } catch (error) {
      console.error("Couldn't get pyramids:", error);
    }
  };
  const handleNavigate =(id)=>{
    // console.log(id)
    navigate('/mypyramids/')
    handleAPyramid(id);

  }
  useEffect(() => {
    getUserPyramids();
  }, [userId]);

  return (
    <>
      <Container className="d-flex flex-column">
        <Row className="text-center">
          <h3>Dashboard</h3>
        </Row>
        <Row>
          {/* Most Recent Pyramid (3)*/}
          <Col lg={6}>
            <Card>
              <CardHeader id="progress" className="text-center">
                Most Recent Pyramid
              </CardHeader>
              <CardBody>
                <Table striped>
                  <thead>
                    <tr className="text-center">
                      <th>Difficulty</th>
                      <th>location</th>
                      <th>Date created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(savedPyramid) &&
                      savedPyramid.slice(0, 3).map((pyramid, index) => (
                        <tr key={index} className="text-center">
                          <td onClick={()=>handleNavigate(pyramid.id)}>
                            {pyramid.goal_grade}
                            {/* <Link to={`/pyramid/${pyramid.id}/`}>
                              {pyramid.goal_grade}
                            </Link> */}
                          </td>
                          <td>{pyramid.latitude}, {pyramid.longitude}</td>
                          <td>{pyramid.date_generated}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          {/* Preferences */}
          <Col lg={6}>
            <Card>
              <CardHeader id="preferences" className="text-center">
                Preferences
              </CardHeader>
              <CardBody>
                <ul style={{ textDecoration: "none" }}>
                  <li>My Goal: {userProfile?.goal}</li>
                  <li>Current Location: {location?.name} </li>
                  {/* <SearchBox address={userProfile?.location} setPlace={setPlace} /> */}
                  <li>
                    Preference Area Distance:{" "}
                    {Math.round(userProfile?.dwtt / 1609.34)} miles
                  </li>
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
                    {Array.isArray(favoriteRoutes) &&
                    favoriteRoutes.length > 0 ? (
                      favoriteRoutes.map((fav, index) => (
                        <tr key={index} className="text-center">
                          <td>
                            <Link
                              to={`/${
                                fav.areaName != null ? "area" : "route"
                              }/${fav.uuid}`}
                            >
                              {fav.areaName != null ? fav.areaName : fav.name}
                            </Link>
                          </td>

                          <td>View</td>
                          <td>
                            <FavButton data={fav} />
                          </td>
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
              <CardHeader id="best-crags" className="text-center">
                Best Reccomended Crags
              </CardHeader>
              <CardBody>
                <BestCrags
                  userProfile={userProfile}
                  location={location}
                  setLocation={setLocation}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
