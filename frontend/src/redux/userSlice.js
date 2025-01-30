import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLastVisited: (state, action) => {
      if (state?.user) {
        state.user.lastVisited = {
          path: action.payload.path,
          timestamp: action.payload.timestamp
        };
      }
    },
    // other reducers...
  }
});

export const { setLastVisited } = userSlice.actions;
export default userSlice.reducer; 