import {createBrowserRouter} from "react-router-dom";

import App from "./App.jsx"
import HomePage from "./pages/HomePage.jsx"
import {RegisterPage} from "./pages/RegisterPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx";
import ContactPage from "./pages/ContactUs.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import RoutesMapPage from "./pages/RoutesMapPage.jsx";
import RoutePage from "./pages/RoutePage.jsx";
import AreaPage from "./pages/AreaPage.jsx";

const router = createBrowserRouter([

  {
    path:"/",
    element:<App/>,
    children:
    [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: "register/",
        element: <RegisterPage/>
      },
      {
        path: "profile/",
        element: <ProfilePage/>
      },
      {
        path: "contact/",
        element: <ContactPage/>
      },
      {
        path: "about/",
        element: <AboutPage/>
      },
      {
        path: "map/",
        element: <RoutesMapPage/>
      },
      {
        path: "route/:id",
        element: <RoutePage/>
      },
      {
        path: "area/:id",
        element: <AreaPage/>
      }
    ]
  }
])
export default router;