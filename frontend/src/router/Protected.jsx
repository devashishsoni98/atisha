
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Protected = ({ allowedRole }) => {
    const token = useSelector((state) => state.user.token) || localStorage.getItem('token'); // Check localStorage if not in Redux
    const navigate = useNavigate(); 
    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
        console.log(pathname);
    }, [pathname]);

    useEffect(() => {
        if (!token) {
            console.error("No token found. Redirecting to signup.");
            navigate('/signup', { replace: true }); // Redirect to signup if no token
        }
    }, [token, navigate]);

    return (
        <div>
            {(() => {
            // Check if the pathname starts with "/quiz/" or "/create-profile/"
            if (pathname.startsWith("/quiz/") || pathname.startsWith("/create-profile/")) {
                return null; // Do not render Navbar
            } else {
                return <Navbar />; // Render Navbar
            }
        })()}
            <Outlet />
        </div>
    );
};

export default Protected;