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
import AllParcels from "@/Pages/Dashboard/Page/Admin/AllParcels/AllParcels";
import AllUsers from "@/Pages/Dashboard/Page/Admin/AllUsers/AllUsers";
import CheckOut from "@/Pages/Dashboard/Page/User/CheckOut/CheckOut";
import MyDeliveryList from "@/Pages/Dashboard/Page/Deliverymen/MyDeliveryList/MyDeliveryList";
import MyReview from "@/Pages/Dashboard/Page/Deliverymen/MyReview/MyReview";
import AllDeliverymen from "@/Pages/Dashboard/Page/Admin/AllDeliverymen/AllDeliverymen";
import AdminRoute from "./AdminRoute";
import DeliverymenRoute from "./DeliverymenRoute";
import ConfettiRoute from "@/Pages/Dashboard/components/Confetti/ConfettiRoute";


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
        // admin related
        {
           index: true,
          element: <AdminRoute><Statistics></Statistics></AdminRoute>
        },
        {
          path: "allParcels",
          element: <AdminRoute><AllParcels></AllParcels></AdminRoute>
        },
        {
          path: "allUsers",
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
          loader: () => fetch('https://parcel-pro-server-ten.vercel.app/totalCount')
        },
        {
          path: 'allDeliverymen',
          element: <AdminRoute><AllDeliverymen></AllDeliverymen></AdminRoute>
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
          loader: ({ params }) => fetch(`https://parcel-pro-server-ten.vercel.app/parcel/${params.id}`)
        },
        {
          path: "checkOut",
          element: <CheckOut></CheckOut>
        },
        {
          path: 'confettiRoute',
          element: <ConfettiRoute></ConfettiRoute>
        },
        
        // delivery men related
        {
          path: "myDeliveryList",
          element: <DeliverymenRoute><MyDeliveryList></MyDeliveryList></DeliverymenRoute>
        },
        {
          path: "myReviews",
          element: <DeliverymenRoute><MyReview></MyReview></DeliverymenRoute>
        }
      ]
    }
  ]);

  export default router