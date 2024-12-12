// Router.jsx
import { createBrowserRouter } from "react-router-dom";
import Unprotected from "./Unprotected";
import Protected from "./Protected";
import Home from "../pages/Home";
import AuthPage from "../pages/AuthPage";
import CareerRoadmaps from "../pages/CareerRoadmaps";
import Roadmap from "../pages/Roadmap";
import Sessions from "../pages/WorkshopEvents.jsx";
import DashboardStudent from "../pages/dashboards/DashboardStudent";
import DashBoardCounselor from "../pages/dashboards/DashBoardCounselor";
import DashboardInstitute from "../pages/dashboards/DashboardInstitute";
import DashboardMentor from "../pages/dashboards/DashboardMentor";
import QuizPage from "../pages/QuizPage";
import QuizFormsPage from "../pages/QuizFormsPage";
import ResultPage from "../pages/ResultPage";
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import Testimonials from "../pages/Testimonials";
import CreateStudentProfile from "../pages/createProfiles/CreateStudentProfile";
import CreateInstituteProfile from "../pages/createProfiles/CreateInstituteProfile";
import CreateCounselorProfile from "../pages/createProfiles/CreateCounselorProfile";
import CreateMentorProfile from "../pages/createProfiles/CreateMentorProfile";
import Mentors from "../pages/Mentors";
import Resources from "../pages/Resource";
import StudentOnboarding from "../pages/onboarding/StudentOnboarding.jsx";
import MentorOnboarding from "../pages/onboarding/MentorOnboarding.jsx";
import CounselorOnboarding from "../pages/onboarding/CounselorOnboarding.jsx";
import InstituteOnborading from "../pages/onboarding/InstituteOnboarding.jsx";
import ReportSubmissionByCounselor from "../pages/ReportSubmissionByCounselor.jsx";
import CounselorBooking from "../pages/CounselorBooking.jsx";
import StudentCounselorBrowsing from "../pages/StudentBrowsing.jsx";
import CounselorTrainingProgram from "../pages/CounselorTrainingProgram.jsx";
import MentorBookings from "../pages/MentorBookings.jsx";
import SomeComponent from "../pages/SessionPreview.jsx";
import EventPreview from "../pages/EventPreview.jsx";
import InteractiveContent from "../pages/InteractiveContents.jsx";
import CareerLibrary from "../pages/CareerLibrary.jsx";
import Level from "../components/Level.jsx";
import OAuthCallback from "../pages/Callback.jsx";
import CareerLens from "../pages/Lens.jsx";
import TypingSpeedTest from "../components/TypingSpeedTest.jsx";
import SessionPreview from "../pages/SessionPreview.jsx";
import CareerDetails from "../pages/CareerDetails.jsx";
import GymTrainerCareer from "../pages/GymTrainerCareer.jsx";
import SingleMentorPage from "../pages/SingleMentorBookings.jsx";

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
        path: "/dashboard/mentor/:id",
        element: <DashboardMentor />,
      },
      {
        path: "/quiz",
        element: <QuizPage />,
      },
      {
        path: "/quiz/start",
        element: <QuizFormsPage />,
      },
      {
        path: "/quiz/result",
        element: <ResultPage />,
      },
      {
        path: "/create-student-profile",
        element: <CreateStudentProfile  />, 
      },
      {
        path: "/create-institute-profile",
        element: <CreateInstituteProfile  />, 
      },
      {
        path: "/create-counselor-profile",
        element: <CreateCounselorProfile  />, 
      },
      {
        path: "/create-mentor-profile",
        element: <CreateMentorProfile  />, 
      },
      {
        path: "/onboarding",
        element: <StudentOnboarding  />, 
      },
      {
        path: "/onboarding-mentor",
        element: <MentorOnboarding  />, 
      },
      {
        path: "/onboarding-counselor",
        element: <CounselorOnboarding  />, 
      },
      {
        path: "/onboarding-institute",
        element: <InstituteOnborading  />, 
      },
      {
        path: "/report-submission-by-counselor",
        element: <ReportSubmissionByCounselor  />,
      },
      {
        path:"/student-browsing",
        element: <StudentCounselorBrowsing  />
      },
      {
        path:"/counselor-booking",
        element: <CounselorBooking  />
      },
      {
        path:"/mentor-booking/:mentorId",
        element: <SingleMentorPage  />
      },
      {
        path: "/training",
        element: <CounselorTrainingProgram />,
      },
      {
      path: "/session-preview/:id",
        element: <SessionPreview />,
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
        path: "/type",
        element: <TypingSpeedTest/>
      },
      {
        path: "/interactive-contents",
        element: <InteractiveContent/>
      },
      {
        path: "/career-library",
        element: <CareerLibrary/>
      },{
        path: "/level",
        element: <Level/>
      },
      {
        path: "/resources",
        element: <Resources/>
      },
      {
        path: "/preview-events/:id",
        element: <EventPreview/>
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
      {
        path: "webex/callback",
        element: <OAuthCallback />
      },
      {
        path: "/lens",
        element: <CareerLens />
      },
      {
        path: "/lens-details",
        element: <CareerDetails />
      },
      {
        path: "/sample",
        element: <GymTrainerCareer />
      },
      
    ],
  },
]);

export default Router;
