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
import TickButton from "../component/TickButton";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const { userId, favoriteRoutes, tickedRoutes, setLastPyramidId } =
    useOutletContext();
  const navigate = useNavigate();
  const [savedPyramid, setSavedPyramid] = useState([]);
  const [uniqueRoutes, setUniqueRoutes] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [startFavIndex, setStartFavIndex] = useState(0);

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

  useEffect(() => {
    if (tickedRoutes.length > 0) {
      const uniqueRoutesMap = {};

      tickedRoutes.forEach((route) => {
        if (!(route.uuid in uniqueRoutesMap)) {
          uniqueRoutesMap[route.uuid] = route;
        }
      });

      setUniqueRoutes(uniqueRoutesMap);
    }
  }, [tickedRoutes]);

  const handleNextTicks = () => {
    setStartIndex(startIndex + 5);
  };

  const handlePrevTicks = () => {
    setStartIndex(Math.max(startIndex - 5, 0));
  };

  const handleNextFavs = () => {
    setStartFavIndex(startFavIndex + 5);
  };

  const handlePrevFavs = () => {
    setStartFavIndex(Math.max(startFavIndex - 5, 0));
  };

  const handleAPyramid = (id) => {
    setLastPyramidId(id);
    navigate("../mypyramids/");
  };

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
                      <th>Goal</th>
                      {/* <th>Id</th> */}
                      <th>Location</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(savedPyramid) &&
                      savedPyramid
                        .slice()
                        .reverse()
                        .slice(0, 5)
                        .map((pyramid, index) => (
                          <tr key={index} className="text-center">
                            <td>{pyramid.goal_grade}</td>
                            <td onClick={() => handleAPyramid(pyramid.id)}>
                              {pyramid.location.split(",",1)}
                            </td>
                            <td>
                              {new Date(
                                pyramid.date_generated
                              ).toLocaleDateString().slice(0,-5)}
                            </td>
                          </tr>
                        ))}
                    <tr className="text-center">
                      <td colSpan={4}>
                        <Link to="../mypyramids/">View More</Link>
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
              <CardHeader id="favorites-card" className="text-center">
                <h4>Favorites</h4>
              </CardHeader>
              <CardBody>
                <Table striped>
                  <thead>
                    <tr className="text-left">
                      
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(favoriteRoutes) &&
                    favoriteRoutes.length > 0 ? (
                      favoriteRoutes
                      .slice(startFavIndex, startFavIndex + 5)
                      .map((fav, index) => (
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
                {favoriteRoutes.length > 5 &&
                <div style={{ display: 'flex', justifyContent: 'space-around' , margin: "0 1rem 0 1rem"}}>
                  <Button onClick={handlePrevFavs} disabled={startFavIndex === 0}>
                    Prev 
                  </Button>
                  <Button
                    onClick={handleNextFavs}
                    disabled={
                      startFavIndex + 5 >= Object.values(favoriteRoutes).length
                    }
                  >
                    Next 
                  </Button>
                </div>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={6} sm={10}>
            <Card>
              <CardHeader id="best-crags" className="text-center">
                <h4>Recommended Crags</h4>
              </CardHeader>
              <CardBody id="card-best-crags">
                {/* change it to only show area name and overall score on small screens */}
                {/* update the user table to reflect the new pref need api call to user model */}
                <BestCrags />
              </CardBody>
            </Card>
          </Col>
          {/* Ticked Routes */}
          <Col lg={6} sm={10}>
            <Card id="tickcard">
              <CardHeader id="ticks-card" className="text-center">
                <h4>Ticks</h4>
              </CardHeader>
              <CardBody>
                <Table striped id="tickTable">
                  <thead>
                    <tr className="text-center">
                     
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(uniqueRoutes).length > 0 ? (
                      Object.values(uniqueRoutes)
                        .slice(startIndex, startIndex + 5)
                        .sort(
                          (b, a) =>
                            new Date(b.date_ticked) - new Date(a.date_ticked)
                        )
                        .reverse()
                        .map((tick, index) => (
                          <tr key={index} className="text-center">
                            <td>
                              <Link to={`/${"route"}/${tick.uuid}`}>
                                {tick.name} ({tick.grade})
                              </Link>
                            </td>
                          
                            <td><p className={tick.style}>
                              {tick.style}
                              </p>
                              </td>
                          
                            <td>
                              {new Date(tick.date_ticked).toLocaleDateString().slice(0,-5)}
                            </td>
                            <td>
                              <TickButton data={tick} />
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
                <div className="text-center" style={{ display: 'flex', justifyContent: 'space-around' , margin: "0 1rem 0 1rem"}}>
                  <Button onClick={handlePrevTicks} disabled={startIndex === 0}>
                    Prev
                  </Button>
                  <Button
                    onClick={handleNextTicks}
                    disabled={
                      startIndex + 5 >= Object.values(uniqueRoutes).length
                    }
                  >
                    Next
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
