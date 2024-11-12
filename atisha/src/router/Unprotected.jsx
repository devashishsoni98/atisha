// Unprotected.jsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Unprotected = ({ allowedRole }) => {
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const navigator = useNavigate();

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigator('/dashboard', { replace: true });
//     }
//   }, [allowedRole, navigator, isAuthenticated]);

  return (
    <div>
      <Navbar/>
      <Outlet />
    </div>
  );
};

export default Unprotected;
