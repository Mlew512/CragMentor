import {createBrowserRouter} from "react-router-dom";

import App from "./App.jsx"
import HomePage from "./pages/HomePage.jsx"
import {RegisterPage} from "./pages/RegisterPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx";
import ContactPage from "./pages/ContactUs.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import MapPage from "./pages/MapPage.jsx";
import RoutePage from "./pages/RoutePage.jsx";
import AreaPage from "./pages/AreaPage.jsx";
import PyramidPage from "./pages/PyramidPage.jsx";
import FavoritesPage from './pages/FavoritesPage.jsx'
import Dashboard from "./pages/Dashboard.jsx";
import SavedPyramidsPage from "./pages/SavedPyramidsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "register/",
        element: <RegisterPage />,
      },
      {
        path: "profile/",
        element: <ProfilePage />,
      },
      {
        path: "contact/",
        element: <ContactPage />,
      },
      {
        path: "about/",
        element: <AboutPage />,
      },
      {
        path: "map/",
        element: <MapPage />,
      },
      {
        path: "route/:id",
        element: <RoutePage />,
      },
      {
        path: "area/:id",
        element: <AreaPage />,
      },
      {
        path: "pyramid/",
        element: <PyramidPage />,
      },
      {
        path: "dashboard/",
        element: <Dashboard/>
      },
      {
        path: "saved-pyramids/",
        element: <SavedPyramidsPage />,
      },
      {
        path: "favorites/",
        element: <FavoritesPage />,
      }
    ],
  },
]);
export default router;