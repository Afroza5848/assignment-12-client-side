import Root from "@/Layout/Root";
import ErrorPage from "@/Pages/ErrorPage/ErrorPage";
import Home from "@/Pages/Home/Home";


import { createBrowserRouter } from "react-router-dom";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<ErrorPage></ErrorPage>,
      children: [
        {
            index: true,
            element: <Home></Home>
        }
      ]
    },
  ]);

  export default router