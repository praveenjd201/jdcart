import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    users: [],
    isUserUpdated: false,
    isUserDeleted: false,
  },
  reducers: {
    usersRequest(state, action) {
      state.loading = true;
    },
    usersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload.users;
    },
    usersFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userRequest(state, action) {
      state.loading = true;
    },
    userSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
    },
    userFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteUserRequest(state, action) {
      state.loading = true;
    },
    deleteUserSuccess(state, action) {
      state.loading = false;
      state.isUserDeleted = true;
    },
    deleteUserFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserRequestAdmin(state, action) {
      state.loading = true;
    },
    updateUserSuccessAdmin(state, action) {
      state.loading = false;
      state.isUserUpdated = true;
      state.user = action.payload.user;
    },
    updateUserFailAdmin(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearToastAlerts(state, action) {
      state.isUserDeleted = false;
      state.isUserUpdated = false;
    },

    clearError(state, action) {
      state.error = null;
    },
  },
});

const { actions, reducer } = userSlice;

export const {
  usersRequest,
  usersSuccess,
  usersFail,
  userRequest,
  userSuccess,
  userFail,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFail,
  updateUserRequestAdmin,
  updateUserSuccessAdmin,
  updateUserFailAdmin,
  clearToastAlerts,
  clearError,
} = actions;

export default reducer;
