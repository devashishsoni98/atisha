// Router.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Protected from "./Protected";
import Unprotected from "./Unprotected";
import Home from "../pages/Home";

const Router = createBrowserRouter([
  {
    // element: <Protected allowedRole="" />,
    // children: [
    //   {
    //     path: "/dashboard",
    //     element: <Dashboard />,
    //   },
    // ],
  },
  {
    element: <Unprotected allowedRole="" />,
    children: [
      { path: "/", element: <Home /> },
      {
        // path: "/signup",
        // element: <LoginFromInv />,
      },
    ],
  },
]);

export default Router;
