import { useEffect, useState } from 'react'
import './App.css'
import Header from './component/Header'
import { Outlet } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Footer from './component/Footer';
import {endpoints, getAPI, postAPI, setAuth} from './utilities/api'

function App() {
  const [userId,setUserId] = useState(null);
  const [user, setUser] = useState("")
  const [myPyramid, setMyPyramid] = useState(null)
  const [favoriteRoutes, setFavoriteRoutes] = useState([]);
  const [userProfile, setUserProfile] = useState({})
  const [location, setLocation] = useState({"lat": null, "lng": null})

  useEffect(()=>{
    console.log(favoriteRoutes)
  },[favoriteRoutes])

  useEffect(()=>{
    let token = localStorage.getItem("token")
    if(token){
      setAuth(token)
    }else{
      setAuth(null)
    }
    
    if(user){
      getFavRoutes()
      // setUserProfile({"current_level":3, "goal":4, "dwtt":10000})
    }
  },[user])

  const getFavRoutes = async()=>{
    try{
      console.log(endpoints.favorites)
      const response = await getAPI(endpoints.favorites)
      console.log(response)
      if(response.status){
        console.log(response.data)
        setFavoriteRoutes(response.data)
      }
    }catch(error){
      console.log(error)
      console.log("Couldn't get routes")
      console.log("Something Bad happened")
    }
  }

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
        favoriteRoutes, setFavoriteRoutes,
        userId, setUserId
         }}/>
      <Footer/>
    </>
  );
}

export default App;
