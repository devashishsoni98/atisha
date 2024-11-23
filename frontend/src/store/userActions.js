// src/store/userActions.js
export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_TOKEN = 'SET_TOKEN'; 
export const SET_USER_ID = 'SET_USER_ID'; // New action type
export const SET_USER_TYPE = 'SET_USER_TYPE'; // Action type for user type

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

export const setToken = (token) => {
    localStorage.setItem('token', token); // Store token in localStorage
    return {
        type: SET_TOKEN,
        payload: token,
    };
};

export const setUserId = (userId) => {
    localStorage.setItem('userId', userId); // Store userId in localStorage
    return {
        type: SET_USER_ID,
        payload: userId,
    };
};

export const setUserType = (userType) => {
    localStorage.setItem('userType', userType); // Store user type in localStorage
    return {
        type: SET_USER_TYPE,
        payload: userType,
    };
};

export const logoutUser = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    localStorage.removeItem('userId'); // Clear userId from localStorage
    localStorage.removeItem('userType'); // Clear user type from localStorage
    return {
        type: LOGOUT_USER,
    };
};
