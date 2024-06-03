import Root from "@/Layout/Root";
import DashBoard from "@/Pages/Dashboard/DashBoard";
import ErrorPage from "@/Pages/ErrorPage/ErrorPage";
import Home from "@/Pages/Home/Home";
import Login from "@/Pages/Login/Login";
import Registration from "@/Pages/Registration/Registration";


import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<ErrorPage></ErrorPage>,
      children: [
        {
            index: true,
            element: <Home></Home>
        },
        {
          path: "/login",
          element: <Login></Login>
        },
        {
          path: '/registration',
          element: <Registration></Registration>
        }
      ]
    },

    {
      path: "/dashboard",
      element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
      
    }
  ]);

  export default router