import {createBrowserRouter} from "react-router-dom";

import App from "./App.jsx"
import HomePage from "./pages/HomePage.jsx"
import {RegisterPage} from "./pages/RegisterPage.jsx"

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
      }
    ]
  }
])
export default router;