// src/router/Router.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Ensure Navigate is imported
import LoginPage from '../pages/LoginPage';
import SignupPanel from '../pages/SignupPage';
import Dashboard from '../pages/Dashboard';
import Protected from './Protected';
import Unprotected from './Unprotected';
import EventPreview from "../components/EventPreview.jsx";

const Router = () => (
  <BrowserRouter>
    <Routes>
      {/* Unprotected Routes */}
      <Route element={<Unprotected />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPanel />} />
        <Route path="/preview" element={<EventPreview />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<Protected />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Redirect to login if no matching route is found */}
      {/*<Route path="*" element={<Navigate to="/login" replace />} />*/}
    </Routes>
  </BrowserRouter>
);

export default Router;