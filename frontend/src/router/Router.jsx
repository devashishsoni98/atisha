// Router.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Unprotected from "./Unprotected";
import Home from "../pages/Home";
import AuthPage from "../pages/AuthPage";
import CareerRoadmaps from "../pages/CareerRoadmaps";
import Roadmap from "../pages/Roadmap";
import Sessions from "../pages/Sessions";
import Protected from "./Protected";
import DashboardStudent from "../pages/DashboardStudent";
import DashBoardCounselor from "../pages/DashBoardCounselor";
import DashboardInstitute from "../pages/DashboardInstitute";
import QuizPage from "../pages/QuizPage";
import QuizFormsPage from "../pages/QuizFormsPage";
import ResultPage from "../pages/ResultPage";



const Router = createBrowserRouter([
  {
    element: <Protected allowedRole="" />,
    children: [
      {
        path: "/dashboard/student/:id",
        element: <DashboardStudent />,
      },
      {
        path: "/dashboard/counselor/:id",
        element: <DashBoardCounselor />,
      },
      {
        path: "/dashboard/institute/:id",
        element: <DashboardInstitute />,
      },
      {
        path: "/quiz",
        element: <QuizPage />,
      },
      {
        path: "/quiz/:type/:qid",
        element: <QuizFormsPage />,
      },
      {
        path: "/result",
        element: <ResultPage />,
      },
    ],
  },
  {
    element: <Unprotected allowedRole="" />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/signup",
        element: <AuthPage />,
      },
      {
        path: "/carrer/roadmaps/explore",
        element: <CareerRoadmaps />,
      },
      {
        path: "/roadmap/:id",
        element: <Roadmap />,
      },
      {
        path: "/sessions/explore",
        element: <Sessions />,
      },
    ],
  },
]);

export default Router;
