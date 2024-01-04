import { useEffect, useState } from "react";
import "./PyramidPage.css"
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import UserForm from "../component/UserForm";
import { api } from "../utilities";
import { GiSaveArrow } from "react-icons/gi";
import PyramidTable from "../component/PyramidTable";

const PyramidPage = () => {
  const navigate = useNavigate();
  const { user, myPyramid, setLocation, userId, location, userProfile} = useOutletContext();
  const { location: userLocation } = useOutletContext();
  const [pyramidId, setPyramidId] = useState(null);
  
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
      const response = await api.post("/pyramid/", {
        user: userId,
        latitude: location.lat,
        longitude: location.lng,
        goal_grade: userProfile.goal
      });

      if (response.status === 201) {
        alert(`Pyramid with id: ${response.data.pyramid_id} saved successfully`);
        // console.log(typeof(myPyramid.goal_climb.uuid), myPyramid.goal_climb.name)
        setPyramidId(response.data.pyramid_id);
        }
      
    } catch (error) {
      console.error("Error saving pyramid:", error);
    }
    };

  const addRoutesToPyramid = async()=> {
    for (const routeKey in myPyramid){
      const route = myPyramid[routeKey];
      try{
        const response = await api.post("/route/",{
        pyramid_id: pyramidId,
        route_id: route?.uuid ,
        name: route?.name,
        grade: userProfile?.goal
        
      })
      if (response.status ===201){
        console.log("route created")
        // console.log(response.data)
      }
      }catch(error){
        console.log("Did not save route")
      }
    }
  }

  useEffect(()=>{
   addRoutesToPyramid(); 
  }, [pyramidId]);

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
        <Row className="justify-content-center text-center">
          <Col lg={4}>
            {/* <Card className="d-flex flex-row justify-content-around"> */}
              <UserForm location={userLocation} setLocation={setLocation} />
              <Button variant= "transparent" onClick={handleSavePyramid}><GiSaveArrow size={25}/></Button>
            {/* </Card> */}
          </Col>
        </Row>
        {myPyramid ? (
          <>
            {the_pyramid}
          </>
        ) : (
          null
        )}
        <PyramidTable userId={userId}/>
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


