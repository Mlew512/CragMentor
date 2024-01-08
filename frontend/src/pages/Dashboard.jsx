import { useEffect, useState } from "react";
import { api } from "../utilities/api";
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

  // To get all Pyramids for user
  const getUserPyramids = async () => {
    const user_id = localStorage.getItem("user_id");
    try {
      const response = await api.get(`/pyramid/user/${user_id}`);
      if (response.status === 200) {
        console.log(response.data);
        setSavedPyramid(response.data);
      }
    } catch (error) {
      console.error("Couldn't get pyramids:", error);
    }
  };
  
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
                      <th>Goal Grade</th>
                      <th>Id</th>
                      <th>Location</th>
                      <th>Date Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(savedPyramid) &&
                      savedPyramid
                        .slice()
                        .reverse()
                        .slice(0, 3)
                        .map((pyramid, index) => (
                          <tr key={index} className="text-center">
                            <td>V{pyramid.goal_grade}</td>
                            <td onClick={() => handleAPyramid(pyramid.id)}>
                              <Button variant="outline-info">
                                {pyramid.id}
                              </Button>
                            </td>
                            <td>{pyramid.location}</td>
                            <td>
                              {new Date(
                                pyramid.date_generated
                              ).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                    <tr className="text-center">
                      <td colSpan={4}>
                        <Link to="../mypyramids/" >View More</Link>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          {/* Reccomended Crags */}
          <Col lg={6}>
            <Card>
              <CardHeader id="best-crags" className="text-center">
                Best Recommended Crags
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
                        <td colSpan="4">No data available</td>
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
};

export default Dashboard;
