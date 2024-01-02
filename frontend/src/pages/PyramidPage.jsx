import { useEffect } from "react";
import "./PyramidPage.css"
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import UserForm from "../component/UserForm";
import { api } from "../utilities";


const PyramidPage = () => {
  const navigate = useNavigate();
  const { user, myPyramid, setLocation } = useOutletContext();
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
      console.log('Request Payload:', requestData);
      const userId = localStorage.getItem('user_id')
      console.log(userId)
      const response = await api.post("/pyramid/", {
        pyramidData: myPyramid,
        userLocation: userLocation,
      });

      if (response.status === 200) {
        console.log("Pyramid saved successfully");
        console.log('API Response:', response.data);
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


