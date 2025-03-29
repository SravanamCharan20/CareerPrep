import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  userInteractions: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLastVisited: (state, action) => {
      if (state?.currentUser) {
        state.currentUser.lastVisited = {
          path: action.payload.path,
          timestamp: action.payload.timestamp
        };
      }
    },
    updateUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.userInteractions = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.userInteractions = null;
      state.loading = false;
      state.error = null;
    },
    signOutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { 
  setLastVisited,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure
} = userSlice.actions;

export default userSlice.reducer; 