import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import EventPreview from './components/EventPreview';
import Sample from './pages/Sample';
import ProtectedRoute from './router/Protected';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/preview" element={<EventPreview />} />
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
        <Route path="/sample" element={<Sample />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        {/* Redirect to login if no matching route is found */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

export default App;
