import SearchBox from '../component/SearchBox'
import React, { useEffect, useRef, useState } from 'react';

import { Card, Row, Col, Container } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom"; 
import { api } from '../utilities'
import JohnPhoto from "../images/TeamPhotos/John.jpg"
import UserForm from "../component/UserForm";

import "./ProfilePage.css"

// POST PUT
// {
//   "email": "example@ex.com",
//   "current_level": null,
//   "goal": null,
//   "location": null,
//   "distance_willing_to_travel": null
// }
const ProfilePage = () => {

  const { user } = useOutletContext();
  const [userInfo, setUserInfo] = useState({})
  const navigate = useNavigate();
  
  const getUserInfo =async()=>{
    try{
      const response = await api.get("users/info")
      setUserInfo(response.data)
    }catch(error){
      console.error(error.response.data)
    }
  }
  
  useEffect(()=>{
    if(!user){
      navigate("/register/")
    }
    getUserInfo();
  },[user])

  return (
      <>
      <Container>

      <Row>
        <Card >
          <Card.Body className="d-flex flex-row">
            <div>
              <img id="profile-img" src={JohnPhoto} style={{width:"200px", height:"200px", borderRadius:"50%"}} />
            </div>
            <ul>
              <li>Email: {userInfo.email}</li>
              <li>Location: {userInfo.location ? userInfo.location: "not updated"}</li>
              <li>Travel Distance: {userInfo.location ? userInfo.location: "not update"}</li>
            </ul>
          </Card.Body>
          <UserForm/>
        </Card>
      </Row>
      </Container>
      </>
  );
}

export default ProfilePage;

