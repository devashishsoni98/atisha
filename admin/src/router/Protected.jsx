<<<<<<< Updated upstream
=======
//
// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
//
// const ProtectedRoute = ({ children }) => {
//   const token = useSelector((state) => state.user.token || localStorage.getItem('token'));
//   console.log(token);
//
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }
//
//   return children;
// };
//
// export default ProtectedRoute;
//

>>>>>>> Stashed changes
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

<<<<<<< Updated upstream
const ProtectedRoute = () => {
  const token = useSelector((state) => state.user.token);
=======
const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.user.token || localStorage.getItem('token'));
>>>>>>> Stashed changes

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;