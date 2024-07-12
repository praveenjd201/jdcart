import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: true,
    isAuthunticated: false,
  },
  reducers: {
    // --------------------------------------------LOGIN reducers-----------------
    loginRequest(state, action) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthunticated = true;
      state.user = action.payload.user;
      state.message = action.payload.user.name;
    },
    loginFail(state, action) {
      state.loading = false;
      state.loginError = action.payload;
    },
    // -------------------------------------------clear API ERROR reducer-----------------
    authClearError(state, action) {
      state.error = null;
      state.loginError = null;
      state.isUpdated = false;
      state.message = null;
    },
    // ------------------------------------------REGISTER Reducers----------------
    registerRequest(state, action) {
      state.loading = true;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthunticated = true;
      state.user = action.payload.user;
    },
    registerFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ----------------------------------------LOAD USER Reducer-------------------------
    loadUserRequest(state, action) {
      state.loading = true;
    },

    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthunticated = true;
      state.user = action.payload.user;
    },
    loadUserFail(state, action) {
      state.loading = false;
    },
    // ----------------------------------------Logout Reducer-------------------------
    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthunticated = false;
      state.message = action.payload;
      state.user = null;
    },
    logoutFail(state, action) {
      state.error = action.payload;
    },
    // ------------------------------------------update profile----------------
    updateUserRequest(state, action) {
      state.loading = true;
      state.isUpdated = false;
    },
    updateUserSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.user = action.payload.user;
    },
    updateUserFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // ------------------------------------------change password----------------
    updatePasswordRequest(state, action) {
      state.loading = true;
      state.isUpdated = false;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
    },
    updatePasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // ------------------------------------------forgot password----------------
    forgotPasswordRequest(state, action) {
      state.loading = true;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    forgotPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // ------------------------------------------Reset password----------------
    resetPasswordRequest(state, action) {
      state.loading = true;
      state.isUpdated = false;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
    },
    resetPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { actions, reducer } = authSlice;
export const {
  loginRequest,
  loginSuccess,
  loginFail,
  authClearError,
  registerRequest,
  registerSuccess,
  registerFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutSuccess,
  logoutFail,
  updateUserRequest,
  updateUserSuccess,
  updateUserFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
} = actions;
export default reducer;
