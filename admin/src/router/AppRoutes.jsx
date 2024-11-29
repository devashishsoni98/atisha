import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import Dashboard from '../pages/Dashboard';
import EventPreview from '../components/EventPreview';
import Sample from '../pages/Sample';
import ProtectedRoute from './Protected';
import Unprotected from './Unprotected';

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

