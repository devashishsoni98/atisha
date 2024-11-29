<<<<<<< Updated upstream:admin/src/router/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
=======
// // src/router/Router.jsx
// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Ensure Navigate is imported
// import LoginPage from '../pages/LoginPage';
// import SignupPanel from '../pages/SignupPage';
// import Dashboard from '../pages/Dashboard';
// import Protected from './Protected';
// import Unprotected from './Unprotected';
// import EventPreview from "../components/EventPreview.jsx";
//
//
// const Router = () => (
//   <BrowserRouter>
//     <Routes>
//       {/* Unprotected Routes */}
//       <Route element={<Unprotected />}>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPanel />} />
//       </Route>
//
//       {/* Protected Routes */}
//       <Route element={<Protected />}>
//         <Route path="/preview" element={<EventPreview />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Route>
//
//       {/* Redirect to login if no matching route is found */}
//       {/*<Route path="*" element={<Navigate to="/login" replace />} />*/}
//     </Routes>
//   </BrowserRouter>
// );
//
// export default Router;


import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
>>>>>>> Stashed changes:admin/src/router/Router.jsx
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import Dashboard from '../pages/Dashboard';
import EventPreview from '../components/EventPreview';
import Sample from '../pages/Sample';
import ProtectedRoute from './Protected';
import Unprotected from './Unprotected';

<<<<<<< Updated upstream:admin/src/router/AppRoutes.jsx
const AppRoutes = () => {
  return (
    <Routes>
      {/* Unprotected Routes */}
      <Route element={<Unprotected />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/preview" element={<EventPreview />} />
        <Route path="/sample" element={<Sample />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Redirect to login if no matching route is found */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
=======
const Router = () => (
    <BrowserRouter>
      <Routes>
        {/* Unprotected Routes */}
        <Route element={<Unprotected />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPanel />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<Protected />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/preview" element={<EventPreview />} />
        </Route>

        {/* Redirect to login if no matching route is found */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
);
>>>>>>> Stashed changes:admin/src/router/Router.jsx

