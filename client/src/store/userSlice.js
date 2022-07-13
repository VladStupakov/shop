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
      localStorage.setItem("accessToken", action.payload.accessToken)
    },
    loginFail: (state) => {
      state.isFetching = false
      state.error = true
    },
    logout: (state) => {
        state.currentUser = null
        localStorage.removeItem('accessToken')
    },
    checkStart: (state) =>{
      state.isFetching = true
    },
    checkFail: (state) =>{
      state.isFetching = false
      localStorage.removeItem('accessToken')
    },
    checkSuccess: (state, action) =>{
      state.isFetching = false
      localStorage.setItem("accessToken", action.payload.accessToken)
    }
  },
});

export const { loginStart, loginSuccess, loginFail, logout, checkStart, checkSuccess, checkFail } = userSlice.actions;
export default userSlice.reducer;