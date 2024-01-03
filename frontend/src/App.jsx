import { useEffect, useState } from 'react'
import './App.css'
import Header from './component/Header'
import { Outlet } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Footer from './component/Footer';
import {endpoints, postAPI} from './utilities/api'
function App() {
  const [user, setUser] = useState("")
  const [myPyramid, setMyPyramid] = useState(null)
  const [favoriteRoutes, setFavoriteRoutes] = useState(null);
  const [userProfile, setUserProfile] = useState({})
  const [location, setLocation] = useState({"lat": null, "lng": null})

  useEffect(()=>{
    
    // add default, goal, current_level, distance willing to travel, location
    if(user){
      getFavRoutes()
      setUserProfile({"current_level":3, "goal":4, "dwtt":10000})
    }
  },[user])

  const getFavRoutes = async()=>{
    try{
      const response = await postAPI(endpoints.favorites)
      console.log(response)
      if(response.status ===200){
        console.log(response.data)
        setFavoriteRoutes(response.data)
      }
    }catch(error){
      console.log("Couldn't get routes")
      console.log("Something Bad happened")
    }
  }




  return (
    <>
      <Header user={user} setUser={setUser}/>
      <Outlet context={{ 
        user, setUser, 
        myPyramid, setMyPyramid, 
        userProfile, setUserProfile,
        location, setLocation,
        favoriteRoutes, setFavoriteRoutes
         }}/>
      <Footer/>
    </>
  );
}

export default App;
