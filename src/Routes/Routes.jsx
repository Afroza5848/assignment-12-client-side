import Root from "@/Layout/Root";
import DashBoard from "@/Pages/Dashboard/DashBoard";
import ErrorPage from "@/Pages/ErrorPage/ErrorPage";
import Home from "@/Pages/Home/Home";
import Login from "@/Pages/Login/Login";
import Registration from "@/Pages/Registration/Registration";


import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Statistics from "@/Pages/Dashboard/Page/Statistics";
import Profile from "@/Pages/Dashboard/Page/Profile/Profile";
import BookingParcel from "@/Pages/Dashboard/Page/User/BookingParcel/BookingParcel";
import MyParcels from "@/Pages/Dashboard/Page/User/MyParcels/MyParcels";
import UpdateBooking from "@/Pages/Dashboard/Page/User/UpdateBooking/UpdateBooking";

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
      path: "dashboard",
      element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
      children: [
        {
           index: true,
          element: <Statistics></Statistics>
        },
        // user related 
        {
          path: "myProfile",
          element: <Profile></Profile>
        },
        {
          path: "bookingParcel",
          element: <BookingParcel></BookingParcel>
        },
        {
          path: "myParcel",
          element: <MyParcels></MyParcels>
        },
        {
          path: "updateBooking/:id",
          element: <UpdateBooking></UpdateBooking>,
          loader: ({ params }) => fetch(`http://localhost:5000/parcel/${params.id}`)
        }
      ]
    }
  ]);

  export default router