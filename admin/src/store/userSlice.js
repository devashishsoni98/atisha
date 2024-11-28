import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: '',
  email: '',
  token: localStorage.getItem('token') || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    logoutUser: (state) => {
      state.id = null;
      state.name = '';
      state.email = '';
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, setToken, logoutUser } = userSlice.actions;
export default userSlice.reducer;

