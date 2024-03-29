import { useEffect, useState, useRef } from 'react'
import './App.css'
import Header from './component/Header'
import { Outlet, useNavigate, useLocation as useRouterLocation } from 'react-router-dom';
import Footer from './component/Footer';
import {endpoints, getAPI, setAuth} from './utilities/api'


function App() {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState("");
  const [myPyramid, setMyPyramid] = useState(null);
  const [favoriteRoutes, setFavoriteRoutes] = useState([]);
  const [tickedRoutes, setTickedRoutes] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [location, setLocation] = useState({ "lat": null, "lng": null });
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();
  const lastVisited = useRef();
  const [lastPyramidId, setLastPyramidId]= useState();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setAuth(token);
    } else {
      setAuth(null);
    }

    if (user) {
      getFavRoutes();
      getTickedRoutes();
    }
  }, [user, tickedRoutes.length]);

  

  const getFavRoutes = async () => {
    try {
      const response = await getAPI(endpoints.favorites);
      if (response.status) {
        setFavoriteRoutes(response.data);
      }
    } catch (error) {
      console.log("Couldn't get favorites");
      console.error(error);
    }
  }
  const getTickedRoutes = async () => {
    try {
      const response = await getAPI(endpoints.ticks);
      if (response.status) {
        setTickedRoutes(response.data);
      }
    } catch (error) {
      console.log("Couldn't get ticks");
      console.error(error);
    }
  }

  useEffect(() => {
    whoAmI();
  }, []);

  useEffect(() => {
    if (!user) {
      lastVisited.current = routerLocation.pathname;
    }
  }, [routerLocation]);

  useEffect(() => {
    if (lastVisited.current) {
      navigate(lastVisited.current);
    }
  }, []); // This effect runs only once when the component mounts

  const whoAmI = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      setAuth(token);
      let response = await getAPI("users/info");
      if (response.data.email) {
        setUser(response.data);
      }
    }
  };

  return (
    <>
      <Header user={user} setUser={setUser} />
      <Outlet
        context={{
          user, setUser,
          myPyramid, setMyPyramid,
          userProfile, setUserProfile,
          location, setLocation,
          favoriteRoutes, setFavoriteRoutes,
          tickedRoutes, setTickedRoutes,
          userId, setUserId,
          lastPyramidId, setLastPyramidId
        }}
      />
      <Footer/>
    </>
  );
}

export default App;

