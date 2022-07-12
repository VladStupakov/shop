import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true
    },
    loginSuccess: (state, action) => {
      state.isFetching = false
      state.currentUser = action.payload
      localStorage.setItem("token", action.payload.accessToken)
    },
    loginFail: (state) => {
      state.isFetching = false
      state.error = true
    },
    logout: (state) => {
        state.currentUser = null
        localStorage.removeItem('token')
    },
  },
});

export const { loginStart, loginSuccess, loginFail, logout } = userSlice.actions;
export default userSlice.reducer;