// Router.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Unprotected from "./Unprotected";
import Home from "../pages/Home";
import AuthPage from "../pages/AuthPage";
import CarrerRoadmaps from "../pages/CarrerRoadmaps";
import Roadmap from "../pages/Roadmap";
import Sessions from "../pages/Sessions";
import Protected from "./Protected";
import DashboardStudnet from "../pages/DashboardStudnet";
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
        element: <DashboardStudnet />,
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
        element: <CarrerRoadmaps />,
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
