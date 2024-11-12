// Router.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Unprotected from "./Unprotected";
import Home from "../pages/Home";
import AuthPage from "../pages/AuthPage";


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
        path: "/signup",
        element: <AuthPage />,
      },
    ],
  },
]);

export default Router;
