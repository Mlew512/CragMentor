import { useEffect, useState, useRef } from 'react'
import './App.css'
import Header from './component/Header'
import { Outlet, useNavigate, useLocation as useRouterLocation } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Footer from './component/Footer';
import { endpoints, getAPI, postAPI, setAuth } from './utilities/api'

function App() {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState("");
  const [myPyramid, setMyPyramid] = useState(null);
  const [favoriteRoutes, setFavoriteRoutes] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [location, setLocation] = useState({ "lat": null, "lng": null });

  const navigate = useNavigate();
  const routerLocation = useRouterLocation();
  const lastVisited = useRef();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setAuth(token);
    } else {
      setAuth(null);
    }

    if (user) {
      getFavRoutes();
      setUserProfile({ "current_level": 3, "goal": 4, "dwtt": 10000 });
    }
  }, [user]);

  const getFavRoutes = async () => {
    try {
      const response = await getAPI(endpoints.favorites);
      if (response.status) {
        setFavoriteRoutes(response.data);
      }
    } catch (error) {
      console.log("Couldn't get routes");
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
          userId, setUserId
        }}
      />
      <Footer />
    </>
  );
}

export default App;

// import { Outlet } from "react-router-dom";
// import { Navbar } from "./components/Navbar";
// import { useState, useEffect, useRef } from "react";
// import { api } from "./utilities";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function App() {
//   const [user, setUser] = useState("");
//   const [userForNavbar, setUserForNavbar] = useState("");
//   const [login, setLogin] = useState(true);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const lastVisited = useRef();

//   const whoAmI = async () => {
//     // Check if a token is stored in the localStorage
//     let token = localStorage.getItem("token");
//     if (token) {
//       // If the token exists, set it in the API headers for authentication
//       api.defaults.headers.common["Authorization"] = `Token ${token}`;
//       // Fetch the user data from the server using the API
//       let response = await api.get("users/info");
//       // Check if the response contains the user data (email field exists)
//       if (response.data.email) {
//         // Set the user data in the context or state (assuming `setUser` is a state update function)
//         setUser(response.data);
//         // If the user is authenticated and there is a stored lastVisited page,
//         // navigate to the lastVisited page; otherwise, navigate to the default homepage "/home"
//         if (lastVisited.current) {
//           navigate(lastVisited.current);
//         } else {
//           navigate("/home");
//         }
//       }
//     } else {
//       // If no token is found, navigate to the home page for login prompt
//       navigate("/");
//     }
//   };

//   // This useEffect block runs once when the component mounts (due to the empty dependency array [])
//   // It calls the whoAmI function to check the user's authentication status and perform redirection accordingly
//   useEffect(() => {
//     whoAmI();
//   }, []);

//   // This useEffect block runs whenever the location (pathname) changes
//   // It updates the lastVisited ref with the current location pathname
//   // This allows the whoAmI function to access the lastVisited page for redirection if needed
//   useEffect(() => {
//     if (!user) {
//       // If the user is not authenticated, update the lastVisited ref with the current location pathname
//       lastVisited.current = location.pathname;
//     }
//   }, [location]);

//   useEffect(() => {
//     // Update the userForNavbar whenever the user state changes
//     setUserForNavbar(user);
//   }, [user]);

//   return (
//     <>
//       <Navbar user={userForNavbar} setUser={setUser} login={login} setLogin={setLogin} />{" "}
//       {/* Why doesn't this have access to user state natively? */}
//       <Outlet context={{ user, setUser, login, setLogin }} />
//     </>
//   );
// }
