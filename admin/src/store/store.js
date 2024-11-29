import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const localStorageMiddleware = ({ getState }) => {
  return next => action => {
    const result = next(action);
    localStorage.setItem('reduxState', JSON.stringify(getState()));
    return result;
  };
};

const reHydrateStore = () => {
  if (localStorage.getItem('reduxState') !== null) {
    return JSON.parse(localStorage.getItem('reduxState')); // re-hydrate the store
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: reHydrateStore(),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
