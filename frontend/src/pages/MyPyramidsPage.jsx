import { useNavigate, useOutletContext } from "react-router-dom";
import PyramidTable from "../component/PyramidTable";
import {Button, Form, Modal, Row, Col, Card, CardBody, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { PyramidMentor } from "../component/PyramidMentor";
import { putAPI, postAPI, endpoints } from "../utilities/api";
import TickButton from "../component/TickButton";

const MyPyramidsPage = () => {
  const { user, userId, setTickedRoutes } = useOutletContext();
  const navigate = useNavigate();
  const [pyramid, setPyramid] = useState(null);
  const {tickedRoutes} = useOutletContext();



  useEffect(() => {
    if (!user) {
      navigate("/register/");
    }
  }, [user]);
  
  //if the route is not in the completed route ticklist, create a tick there?
  // check if ticks are in the pyramid and check them if they are.
  useEffect(() => {
    const tickedStyles = new Set(['Redpoint', 'Onsight', 'Flash', 'Pinkpoint']);
  
    if(!pyramid){
      return;
    }
    // Map over the pyramid array, checking if each route's UUID is in tickedRoutes and if its style is ticked
    const updatedPyramid = pyramid.map(route => {
      // Check if the route's UUID is included in tickedRoutes and if its style is ticked
      const isTicked = tickedRoutes.some(tickedRoute => tickedRoute.uuid === route.uuid && tickedStyles.has(tickedRoute.style));
      console.log(tickedRoutes)
      // If the route is ticked, mark it as completed
      if (isTicked && !route.completed) {
        putComplete(route)
        return { ...route, completed: true };
        
      }else if(!isTicked && route.completed){
        putComplete(route)
        return{...route, completed: false };
      }
      // Otherwise, return the route unchanged
      
      return route;
    });
  
    // Update the pyramid state
    setPyramid(updatedPyramid);
  
  }, [Array.isArray(pyramid), tickedRoutes.length]);
  
  const putComplete = async (route) => {
    try {
      const response = await putAPI(`${endpoints.pyramidroute}/`, null, route);
      if (response.status) {
        // console.log("route updated in backend")
      } else {
        console.log("Error editing route");
      }
    } catch (error) {
      console.error("Error editing route:", error);
    }
  };

  const the_pyramid = (
    <>
      {Array.isArray(pyramid) && pyramid.length > 0 ? (
        <>
          <Row>
            <Card id="pyramid-container" style={{ minHeight: "400px" }}>
              <CardBody className="d-flex flex-column">
                <div style={{ position: "absolute", right: "10%" }}>
                  <p className="text-end m-0 px-5">You Got This!</p>
                  <PyramidMentor />
                </div>
                <Row className="justify-content-center">
                  <Col lg={3}>
                    <Card className="pyramid-card text-center" style={{backgroundColor: pyramid[0].completed ? "rgba(0, 255, 0, 0.5)" : ""}}>
                      <p>
                        <i>{pyramid[0].area}</i>
                      </p>
                      <h4
                        onClick={() =>
                          navigate(`/route/${pyramid[0].uuid}`)
                        }
                      >
                        {pyramid[0].name} ({pyramid[0].grade})
                      </h4>
                      
                      <TickButton data={pyramid[0]}/>
                    </Card>
                  </Col>
                </Row>

                <Row className="justify-content-center">
                  <Col lg={3}>
                    <Card className="pyramid-card text-center" style={{backgroundColor: pyramid[1].completed ? "rgba(0, 255, 0, 0.5)" : ""}}>
                      <p>
                        <i>{pyramid[1].area}</i>
                      </p>
                      <h4
                        onClick={() =>
                          navigate(`/route/${pyramid[1].uuid}`)
                        }
                      >
                        {pyramid[1].name} ({pyramid[1].grade})
                      </h4>
                      <TickButton data={pyramid[1]}/>
                    </Card>
                  </Col>
                  <Col lg={3}>
                    <Card className="pyramid-card text-center" style={{backgroundColor: pyramid[2].completed ? "rgba(0, 255, 0, 0.5)" : ""}}>
                      <p>
                        <i>{pyramid[2].area}</i>
                      </p>
                      <h4
                        onClick={() =>
                          navigate(`/route/${pyramid[2].uuid}`)
                        }
                      >
                        {pyramid[2].name} ({pyramid[2].grade})
                      </h4>
                      <TickButton data={pyramid[2]}/>

                    </Card>
                  </Col>
                </Row>

                <Row className=" justify-content-center">
                  <Col lg={3}>
                    <Card className="pyramid-card text-center" style={{backgroundColor: pyramid[3].completed ? "rgba(0, 255, 0, 0.5)" : ""}}>
                      <p>
                        <i>{pyramid[3].area}</i>
                      </p>
                      <h4
                        onClick={() =>
                          navigate(`/route/${pyramid[3].uuid}`)
                        }
                      >
                        {pyramid[3].name} ({pyramid[3].grade})
                      </h4>
                      <TickButton data={pyramid[3]}/>

                    </Card>
                  </Col>
                  <Col lg={3}>
                    <Card className="pyramid-card text-center" style={{backgroundColor: pyramid[4].completed ? "rgba(0, 255, 0, 0.5)" : ""}}>
                      <p>
                        <i>{pyramid[4].area}</i>
                      </p>
                      <h4
                        onClick={() =>
                          navigate(`/route/${pyramid[4].uuid}`)
                        }
                      >
                        {pyramid[4].name} ({pyramid[4].grade})
                      </h4>
                      <TickButton data={pyramid[4]}/>
                    </Card>
                  </Col>
                  <Col lg={3}>
                    <Card className="pyramid-card text-center" style={{backgroundColor: pyramid[5].completed ? "rgba(0, 255, 0, 0.5)" : ""}}>
                      <>
                        <p>
                          <i>{pyramid[5].area} </i>
                        </p>
                        <h4
                          onClick={() =>
                            navigate(`/route/${pyramid[5].uuid}`)
                          }
                        >
                          {pyramid[5].name} ({pyramid[5].grade})
                        </h4>
                        <TickButton data={pyramid[5]}/>
                      </>
                    </Card>
                  </Col>
                  <Col lg={3}>
                    <Card className="pyramid-card text-center" style={{backgroundColor: pyramid[6].completed ? "rgba(0, 255, 0, 0.5)" : ""}}>
                      <p>
                        <i>{pyramid[6].area}</i>
                      </p>
                      <h4
                        onClick={() =>
                          navigate(`/route/${pyramid[6].uuid}`)
                        }
                      >
                        {pyramid[6].name} ({pyramid[6].grade})
                      </h4>
                      <TickButton data={pyramid[6]}/>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Row>
        </>
      ) : null}
    </>
  );

  return (
    <>
      <Container className="d-flex flex-column width-100%">
        <Row className="justify-content-center">

          {pyramid ? (
            the_pyramid
          ) : (
            <>
              <Row className="m-0">
                <Card
                  id="pyramid-container"
                  className="width-100% "
                  style={{ minHeight: "400px" }}
                >
                  <CardBody className="d-flex justify-content-center align-items-center">
                    <p>Click grade to view your saved pyramid here.</p>
                    <PyramidMentor />
                  </CardBody>
                </Card>
              </Row>
            </>
          )}
        </Row>
        <PyramidTable
          userId={userId}
          setPyramid={setPyramid}
          pyramid={pyramid}
        />
      </Container>
    </>
  );
};

export default MyPyramidsPage;
