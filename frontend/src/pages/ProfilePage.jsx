

import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom"; 
import { api } from '../utilities'
import JohnPhoto from "../images/TeamPhotos/John.jpg"
import UserForm from "../component/UserForm";

import "./ProfilePage.css"

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

  // response.data the rest of the data

  const [formData, setFormData] = useState({
    email: "",
    current_level: "",
    goal: "",
    location: "",
    distance_willing_to_travel: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await api.post("/beta", formData)
      if (response.status === 200) {
        console.log("Profile updated")
      } else {
        console.error("Failed to update profile")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
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
      <Row>
        <Col lg={8}>
          <Card id="profile-card" className="d-flex flex-row">
            <div>
              <img id="profile-img" src={JohnPhoto} style={{width:"200px", height:"200px", borderRadius:"50%"}} />
            </div>
            <Card.Body>
              <div>
                <ul>
                  <li>Email: {userInfo.email}</li>
                  <li>Location: {userInfo.location ? userInfo.location: "Your location is not updated"}</li>
                  <li>Travel Distance: {userInfo.location ? userInfo.location: "Distance willing to travel is not update"}</li>
                </ul>
              </div>
              {/* Modal button below */}
              <UserForm user={user} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </>
  );
}

export default ProfilePage;

// POST PUT
// {
//   "email": "example@ex.com",
//   "current_level": null,
//   "goal": null,
//   "location": null,
//   "distance_willing_to_travel": null
// }