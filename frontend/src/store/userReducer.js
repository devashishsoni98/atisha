// src/store/userReducer.js
import {
  SET_USER,
  SET_TOKEN,
  LOGOUT_USER,
  SET_USER_ID,
  SET_USER_TYPE,
  SET_USER_NAME,
} from "./userActions";

const initialState = {
  id: null,
  name: "",
  email: "",
  roleId: null,
  roleType: "",
  token: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload, // Store the token in Redux state
      };
    case SET_USER_ID:
      return {
        ...state,
        id: action.payload, // Store user ID in Redux state if needed
      };
    case SET_USER_TYPE:
      return {
        ...state,
        roleType: action.payload, // Store user type in Redux state if needed
      };
    case SET_USER_NAME:
      return {
        ...state,
        name: action.payload, // Store user name in Redux state
      };
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
