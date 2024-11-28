// src/store/userActions.js
export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_TOKEN = 'SET_TOKEN'; 
export const SET_USER_ID = 'SET_USER_ID'; // New action type
export const SET_USER_TYPE = 'SET_USER_TYPE'; // Action type for user type
export const SET_USER_NAME = 'SET_USER_NAME'; // New action type for user name

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

export const setToken = (token) => {
    localStorage.setItem('token', token); // Store token in localStorage
    console.log("Token set in localStorage:", localStorage.getItem('token'));
    return {
        type: SET_TOKEN,
        payload: token,
    };
};

export const getToken = () => {
    return localStorage.getItem('token'); // Retrieve token from localStorage
};

export const setUserId = (userId) => {
    localStorage.setItem('userId', userId); // Store userId in localStorage
    console.log("User ID set in localStorage:", localStorage.getItem('userId'));
    return {
        type: SET_USER_ID,
        payload: userId,
    };
};

export const setUserType = (userType) => {
    localStorage.setItem('userType', userType); // Store user type in localStorage
    console.log("User type set in localStorage:", localStorage.getItem('userType'));
    return {
        type: SET_USER_TYPE,
        payload: userType,
    };
};

export const setUserName = (userName) => {
    localStorage.setItem('userName', userName); // Store userName in localStorage
    console.log("User name set in localStorage:", localStorage.getItem('userName'));
    return {
        type: SET_USER_NAME,
        payload: userName,
    };
};



export const logoutUser = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    localStorage.removeItem('userId'); // Clear userId from localStorage
    localStorage.removeItem('userType'); // Clear user type from localStorage
    localStorage.removeItem('userName');
    return {
        type: LOGOUT_USER,
    };
};
