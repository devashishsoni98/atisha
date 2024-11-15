// Protected.jsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Protected = ({ allowedRole }) => {
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const navigator = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       console.log("Auth: ", isAuthenticated);
//       navigator('/signup', { replace: true });
//     }
//   }, [allowedRole, navigator, isAuthenticated]);

const pathname = useLocation();

useEffect(()=>{
  console.log(pathname);
  
},[])

  return (
    <div>
      { pathname==="/quiz/**" ?<Navbar/>:""}
      <Outlet />
    </div>
  );
};

export default Protected;
