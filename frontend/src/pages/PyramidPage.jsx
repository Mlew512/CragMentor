import { useEffect } from "react";
import "./PyramidPage.css"
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import UserForm from "../component/UserForm";
import { api } from "../utilities";


const PyramidPage = () => {
  const navigate = useNavigate();
  const { user, myPyramid, setLocation, userId, location, userProfile} = useOutletContext();
  const { location: userLocation } = useOutletContext();

  useEffect(() => {
    if (!user) {
      navigate("/register/");
    }
  }, [user, myPyramid]);

  const handleSavePyramid = async () => {
    try {
      const requestData = {
        pyramidData: myPyramid,
        userLocation: userLocation,
      };
      // console.log('Request Payload:', requestData);
      // console.log("goal grade: ", userProfile.goal, location.lat, location.lng, userId)
      
      const response = await api.post("/pyramid/", {
        user: userId,
        latitude:location.lat,
        longitude:location.lng,
        goal_grade: userProfile.goal
      });

      if (response.status === 201) {
        alert(`Pyramid with id: ${response.data.pyramid_id} saved successfully`);
        // http://127.0.0.1:8000/api/route/
        // example data to pass
        // {
        //   "pyramid_id":3,#input pyramid_id returned when making pyramid
        //   "route_id": "89a929e2-d3d9-5219-baca-1f37855821b0",
        //   "name": "Super duper Mario",
        //   "lat": 35.249734999999994,
        //   "lng": -85.21837,
        //   "area": "58994c28-e56a-5a34-a931-ba2324ea4a91",
        //   "grade": 4,
        //   "media": "u/4d748baa-b0f9-4308-88a9-d574232654c8"
        // }
      }
      
    } catch (error) {
      console.error("Error saving pyramid:", error);
    }
  };

  const the_pyramid = (
    <>
      <Row className="justify-content-center">
        <Col lg={3}>
          <Card className="text-center">
            <Link to={`/route/${myPyramid?.goal_climb.uuid}`}>
              <h5>{myPyramid?.goal_climb.name}</h5>
            </Link>
            <Card.Footer>{myPyramid?.goal_climb.grade}</Card.Footer>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={3}>
          <Card className="text-center">
            <Link to={`/route/${myPyramid?.runner_up_1.uuid}`}>
              <h5>{myPyramid?.runner_up_1.name}</h5>
            </Link>
            <Card.Footer>{myPyramid?.runner_up_1.grade}</Card.Footer>
          </Card>
        </Col>
        <Col lg={3}>
          <Card className="text-center">
            <Link to={`/route/${myPyramid?.runner_up_2.uuid}`}>
              <h5>{myPyramid?.runner_up_2.name}</h5>
            </Link>
            <Card.Footer>{myPyramid?.runner_up_2.grade}</Card.Footer>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={3}>
          <Card className="text-center">
            <Link to={`/route/${myPyramid?.runner_up_3.uuid}`}>
              <h5>{myPyramid?.runner_up_3.name}</h5>
            </Link>
            <Card.Footer>{myPyramid?.runner_up_3.grade}</Card.Footer>
          </Card>
        </Col>
        <Col lg={3}>
          <Card className="text-center">
            <Link to={`/route/${myPyramid?.runner_up_4.uuid}`}>
              <h5>{myPyramid?.runner_up_4.name}</h5>
            </Link>
            <Card.Footer>{myPyramid?.runner_up_4.grade}</Card.Footer>
          </Card>
        </Col>
        <Col lg={3}>
          <Card className="text-center">
            <Link to={`/route/${myPyramid?.runner_up_5.uuid}`}>
              <h5>{myPyramid?.runner_up_5.name}</h5>
            </Link>
            <Card.Footer>{myPyramid?.runner_up_5.grade}</Card.Footer>
          </Card>
        </Col>
        <Col lg={3}>
          <Card className="text-center">
            <Link to={`/route/${myPyramid?.runner_up_6.uuid}`}>
              <h5>{myPyramid?.runner_up_6.name}</h5>
            </Link>
            <Card.Footer>{myPyramid?.runner_up_6.grade}</Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
  return (
    <>
      <Container className="d-flex flex-column">
        <Row className="justify-content-center">
          <Col lg={4}>
            <Card>
              <UserForm location={userLocation} setLocation={setLocation} />
            </Card>
          </Col>
        </Row>
        {myPyramid ? (
          <>
            {the_pyramid}
            <Row className="justify-content-center">
              <Col lg={4}>
                <Button onClick={handleSavePyramid}>Save Pyramid</Button>
              </Col>
            </Row>
          </>
        ) : (
          null
        )}
      </Container>
    </>
  );
};

export default PyramidPage;

// import { useEffect } from "react";
// import "./PyramidPage.css"
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { useNavigate, useOutletContext, Link } from "react-router-dom";
// import UserForm from "../component/UserForm";
// import { api } from '../utilities';

// const PyramidPage = () => {
//   const navigate = useNavigate();
//   const { user, myPyramid, setUserInfo } = useOutletContext();
//   const list = [0, 1, 2, 3, 4, 5, 6]

//   useEffect(() => {
//     if (!user) {
//       navigate("/register/");
//     }
//   }, [user, myPyramid]);

//   // const handleSave = async () => {
//   //   try {
//   //     const response = await api.post("/", { //Endpont?
//   //       pyramidData: myPyramid,
//   //     });

//   //     if (response.status === 200) {
//   //       const savedPyramid = response.data;

//   //       if (
//   //         savedPyramid &&
//   //         savedPyramid.goal_climb &&
//   //         Array.isArray(savedPyramid.goal_climb) &&
//   //         savedPyramid.goal_climb.length > 0
//   //       ) {
//   //         alert("Pyramid saved successfully!");
//   //       } else {
//   //         alert("Saved pyramid data is not in the expected format");
//   //       }
//   //     } else {
//   //       alert("Failed to save pyramid");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error saving pyramid:", error);
//   //   }
//   // };

//   const the_pyramid = (
//     <>
//       <Row className="justify-content-center">
//         <Col lg={3}>
//           <Card className="text-center">
//             <Link to={`/route/${myPyramid?.goal_climb.uuid}`}>
//               <h5>{myPyramid?.goal_climb.name}</h5>
//             </Link>
//             <Card.Footer>{myPyramid?.goal_climb.grade}</Card.Footer>
//           </Card>
//         </Col>
//       </Row>

//       <Row className="justify-content-center">
//         <Col lg={3}>
//           <Card className="text-center">
//             <Link to={`/route/${myPyramid?.runner_up_1.uuid}`}>
//               <h5>{myPyramid?.runner_up_1.name}</h5>
//             </Link>
//             <Card.Footer>{myPyramid?.runner_up_1.grade}</Card.Footer>
//           </Card>
//         </Col>
//         <Col lg={3}>
//           <Card className="text-center">
//             <Link to={`/route/${myPyramid?.runner_up_2.uuid}`}>
//               <h5>{myPyramid?.runner_up_2.name}</h5>
//             </Link>
//             <Card.Footer>{myPyramid?.runner_up_2.grade}</Card.Footer>
//           </Card>
//         </Col>
//       </Row>

//       <Row className="justify-content-center">
//         <Col lg={3}>
//           <Card className="text-center">
//             <Link to={`/route/${myPyramid?.runner_up_3.uuid}`}>
//               <h5>{myPyramid?.runner_up_3.name}</h5>
//             </Link>
//             <Card.Footer>{myPyramid?.runner_up_3.grade}</Card.Footer>
//           </Card>
//         </Col>
//         <Col lg={3}>
//           <Card className="text-center">
//             <Link to={`/route/${myPyramid?.runner_up_4.uuid}`}>
//               <h5>{myPyramid?.runner_up_4.name}</h5>
//             </Link>
//             <Card.Footer>{myPyramid?.runner_up_4.grade}</Card.Footer>
//           </Card>
//         </Col>
//         <Col lg={3}>
//           <Card className="text-center">
//             <Link to={`/route/${myPyramid?.runner_up_5.uuid}`}>
//               <h5>{myPyramid?.runner_up_5.name}</h5>
//             </Link>
//             <Card.Footer>{myPyramid?.runner_up_5.grade}</Card.Footer>
//           </Card>
//         </Col>
//       </Row>
//       <Row className="justify-content-center">
//         <Col lg={3}>
//           <Card className="text-center">
//             <Link to={`/route/${myPyramid?.runner_up_6.uuid}`}>
//               <h5>{myPyramid?.runner_up_6.name}</h5>
//             </Link>
//             <Card.Footer>{myPyramid?.runner_up_6.grade}</Card.Footer>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
//   return (
//     <>
//       <Container className="d-flex flex-column">
//         <Row className="justify-content-center">
//           <Col lg={4}>
//             <Card>
//               <UserForm />
//             </Card>
//           </Col>
//         </Row>
//         {myPyramid ? the_pyramid : null}
//         {/* <Row className="justify-content-center">
//           <Col lg={4}>
//             <Button variant="primary" onClick={handleSave}>
//               Save Pyramid
//             </Button>
//           </Col>
//         </Row> */}
//       </Container>
//     </>
//   );
// };

// export default PyramidPage;


