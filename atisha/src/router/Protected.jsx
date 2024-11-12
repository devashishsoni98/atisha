// Protected.jsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const Protected = ({ allowedRole }) => {
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const navigator = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       console.log("Auth: ", isAuthenticated);
//       navigator('/signup', { replace: true });
//     }
//   }, [allowedRole, navigator, isAuthenticated]);

  return (
    <div className="flex">
      <Outlet />
    </div>
  );
};

export default Protected;
