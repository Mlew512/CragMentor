import { useEffect, useState } from 'react'
import './App.css'
import Header from './component/Header'
import { Outlet } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Footer from './component/Footer';

function App() {
  const [userId,setUserId] = useState(null);
  const [user, setUser] = useState("")
  const [myPyramid, setMyPyramid] = useState(null)
  const [favoriteRoutes, setFavoriteRoutes] = useState(null);
  const [userProfile, setUserProfile] = useState({})
  const [location, setLocation] = useState({"lat": null, "lng": null})

  useEffect(()=>{
    setUserProfile({"current_level":3, "dwtt":1000})
    // add default, goal, current_level, distance willing to travel, location
    
  },[])

  return (
    <>
      <Header user={user} setUser={setUser}/>
      <Outlet context={{ 
        user, setUser, 
        myPyramid, setMyPyramid, 
        userProfile, setUserProfile,
        location, setLocation,
        userId, setUserId
         }}/>
      <Footer/>
    </>
  );
}

export default App;
