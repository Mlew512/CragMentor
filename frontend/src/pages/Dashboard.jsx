import { useEffect, useState } from "react";
import { api } from "../utilities/api";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
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
    userId,
    favoriteRoutes,
    setLastPyramidId
  } = useOutletContext();
  const navigate = useNavigate();
  const [savedPyramid, setSavedPyramid] = useState([]);


  const getUserPyramids = async () => {
    const user_id = localStorage.getItem("user_id");
    try {
      const response = await api.get(`/pyramid/user/${user_id}`);
      if (response.status === 200) {
        // console.log(response.data);
        setSavedPyramid(response.data);
      }
    } catch (error) {
      console.error("Couldn't get pyramids:", error);
    }
  };
  
  useEffect(() => {
    getUserPyramids();
  }, [userId]);

  const handleAPyramid=(id)=>{
    setLastPyramidId(id);
    navigate("../mypyramids/")
  }

  return (
    <>
      <Container className="d-flex flex-column">
        <Row>
          {/* Most Recent Pyramid (3)*/}
          <Col lg={6} sm={10}>
            <Card>
              <CardHeader id="progress" className="text-center">
                <h4>Most Recent Pyramid</h4>
              </CardHeader>
              <CardBody id="card-progress">
                <Table striped>
                  <thead>
                    <tr className="text-center">
                      <th>Goal Grade</th>
                      {/* <th>Id</th> */}
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
                            <td>{pyramid.goal_grade}</td>
                            <td onClick={() => handleAPyramid(pyramid.id)}>
                              <Button>{pyramid.location}</Button></td>
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
          {/* Favorites */}
          <Col lg={6} sm={10}>
            <Card>
              <CardHeader id="favorites-card" className="text-center"><h4>Favorites</h4></CardHeader>
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
        <Row>
          <Col lg={6} sm={10}>
            <Card>
              <CardHeader id="best-crags" className="text-center">
                <h4>Best Recommended Crags</h4>
              </CardHeader>
              <CardBody id="card-best-crags">
                {/* change it to only show area name and overall score on small screens */}
                {/* update the user table to reflect the new pref need api call to user model */}
                <BestCrags/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
