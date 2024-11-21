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
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import Testimonials from "../pages/Testimonials";
import CreateProfile from "../pages/CreateProfile";
import Mentors from "../pages/Mentors";
import Resources from "../pages/Resource";
import StudentOnboarding from "../pages/Create Profile Components/StudentOnboarding";
import CreateInstituteProfile from "../pages/CareerInstituteProfile";



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
        path: "/quiz/result",
        element: <ResultPage />,
      },
      {
        path: "/create-profile",
        element: <CreateProfile  />, 
      },
      {
        path: "/create-institute-profile",
        element: <CreateInstituteProfile  />, 
      },
      {
        path: "/onboarding",
        element: <StudentOnboarding  />, 
      },
    ],
  },
  {
    element: <Unprotected allowedRole="" />,
    children: [
      {
        path: "/mentors-students/:id",
        element: <Mentors/>
      },
      {
        path: "/resources",
        element: <Resources/>
      },
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
        path: "/roadmap/:topic",
        element: <Roadmap />,
      },
      {
        path: "/sessions/explore",
        element: <Sessions />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contactus",
        element: <ContactUs />,
      },
      {
        path: "/testimonials",
        element: <Testimonials />,
      },
    ],
  },
]);

export default Router;
