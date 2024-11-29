// // src/router/Unprotected.jsx
// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { Outlet, useNavigate } from 'react-router-dom';
//
// const Unprotected = ({ allowedRole }) => {
//     const token = useSelector((state) => state.user.token || localStorage.getItem('token'));;
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         if (token) {
//             navigate('/dashboard/*', { replace: true }); // Redirect to dashboard if already authenticated
//         }
//     }, [token, navigate]);
//
//     return (
//         <div>
//             <Outlet />
//         </div>
//     );
// };
//
// export default Unprotected;

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const Unprotected = () => {
    const token = useSelector((state) => state.user.token || localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/dashboard ', { replace: true }); // Redirect to dashboard if already authenticated
        }
    }, [token, navigate]);

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default Unprotected;