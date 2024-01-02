import SearchBox from '../component/SearchBox'
import React, { useEffect, useRef, useState } from 'react';
import { Card, Row, Col, Container } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import { api } from '../utilities'
import JohnPhoto from "../images/TeamPhotos/John.jpg"
import UserForm from "../component/UserForm";
import "./ProfilePage.css"


const ProfilePage = () => {

  const { user } = useOutletContext();
  const [userInfo, setUserInfo] = useState({})
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await api.get("users/info")
      setUserInfo(response.data)
    } catch (error) {
      console.error(error.response.data)
    }
  }

  useEffect(() => {
    if (!user) {
      navigate("/register/")
    }
    getUserInfo();
  }, [user])

  return (
    <>
      <Container>

        <Row>
          <Card >
            <Card.Body className="d-flex flex-row">
              <div>
                <img id="profile-img" src={JohnPhoto} style={{ width: "200px", height: "200px", borderRadius: "50%" }} />
              </div>
              <ul>
                <li>Email: {userInfo.email}</li>
                <li>Location: {userInfo.location ? userInfo.location : "not updated"}</li>
                <li>Travel Distance: {userInfo.location ? userInfo.location : "not update"}</li>
              </ul>
            </Card.Body>
            <UserForm />
          </Card>
        </Row>
      </Container>
    </>
  );
}

export default ProfilePage;

// import SearchBox from '../component/SearchBox'
// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import { useNavigate, useOutletContext, Link } from "react-router-dom";
// import SavedPyramidsPage from "./SavedPyramidsPage";
// import JohnPhoto from "../images/TeamPhotos/John.jpg";
// import UserForm from "../component/UserForm";
// import { api } from "../utilities";
// import "./ProfilePage.css";

// const ProfilePage = () => {
  
//   const { userContext, setUserContext } = useOutletContext();
//   const [userInfo, setUserInfo] = useState({}); 
//   const navigate = useNavigate();
  

//   const getUserInfo = async () => {
//     try {
//       const response = await api.get("users/info");
//       setUserInfo(response.data); 
      
//       // setUserContext(response.data);
//     } catch (error) {
//       console.error(error.response.data);
//     }
//   };


//   useEffect(() => {
//     if (!userContext) {
//       navigate("/register/");
//     }
//     getUserInfo();
//   }, [userContext, navigate, setUserContext]);

//   return (
//     <>
//       <Container>
//         <Row>
//           <Card>
//             <Card.Body className="d-flex flex-row">
//               <div>
//                 <img
//                   id="profile-img"
//                   src={JohnPhoto}
//                   style={{ width: "200px", height: "200px", borderRadius: "50%" }}
//                   alt="John"
//                 />
//               </div>
//               <ul>
//                 <li>Email: {userInfo.email}</li>
//                 <li>Location: {userInfo.location ? userInfo.location : "not updated"}</li>
//                 <li>Travel Distance: {userInfo.location ? userInfo.location : "not updated"}</li>
//               </ul>
//             </Card.Body>
//             <UserForm />
//           </Card>
//         </Row>
//         {userContext && userContext.savedPyramids && userContext.savedPyramids.length > 0 && (
//           <Row className="justify-content-center">
//             <Col lg={4}>
//               <Link to="saved-pyramids/">Saved Pyramids</Link>
//             </Col>
//           </Row>
//         )}
//         <SavedPyramidsPage />
//       </Container>
//     </>
//   );
// };

// export default ProfilePage;

