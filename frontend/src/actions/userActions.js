import axios from "axios";
import {
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
  updateUserSuccess,
  updateUserRequest,
  updateUserFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
  resetPasswordRequest,
  resetPasswordFail,
  resetPasswordSuccess,
} from ".././slice/authSlice";
import {
  deleteUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  updateUserFailAdmin,
  updateUserRequestAdmin,
  updateUserSuccessAdmin,
  userFail,
  userRequest,
  userSuccess,
  usersFail,
  usersRequest,
  usersSuccess,
} from "../slice/userSlice";

export const login = (email, password) => async (dispatch) => {
  // console.log("email-", email);
  try {
    dispatch(loginRequest());
    let link = "/api/v1/login";
    const { data } = await axios.post(link, { email, password });
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};

export const clearAuthError = (dispatch) => {
  dispatch(authClearError());
};

export const register = (userData) => async (dispatch) => {
  // console.log("email-", email);
  try {
    dispatch(registerRequest());
    let link = "/api/v1/register";
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(link, userData, config);
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFail(error.response.data.message));
  }
};

export const loadUser = async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    let link = "/api/v1/myprofile";
    const { data } = await axios.get(link);
    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};

export const logoutUser = async (dispatch) => {
  try {
    let link = "/api/v1/logout";
    const res = await axios.get(link);

    dispatch(logoutSuccess(res.data.message));
  } catch (error) {
    dispatch(logoutFail(error.response.data.message));
  }
};

export const updateUser = (userData) => async (dispatch) => {
  try {
    dispatch(updateUserRequest());
    let link = "/api/v1/updateprofile";
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(link, userData, config);

    dispatch(updateUserSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(updateUserFail(error.response.data.message));
  }
};

export const changePassword = (userData) => async (dispatch) => {
  try {
    dispatch(updatePasswordRequest());
    let link = "/api/v1/password/change";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(link, userData, config);

    dispatch(updatePasswordSuccess(res.data.message));
  } catch (error) {
    console.log(error);
    dispatch(updatePasswordFail(error.response.data.message));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());
    const link = "/api/v1/password/forgot";
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    console.log(email);
    const res = await axios.post(link, { email });
    dispatch(forgotPasswordSuccess(res.data.message));
  } catch (error) {
    dispatch(forgotPasswordFail(error.response.data.message));
  }
};

export const resetPassword =
  (password, confirmPassword, token) => async (dispatch) => {
    try {
      dispatch(resetPasswordRequest());
      const link = `/api/v1/password/reset/${token}`;
      const res = await axios.post(link, { password, confirmPassword });
      dispatch(resetPasswordSuccess(res.data.message));
    } catch (error) {
      dispatch(resetPasswordFail(error.response.data.message));
    }
  };

//  =----------------- get users by Admin

export const getUsers = async (dispatch) => {
  try {
    dispatch(usersRequest());
    const { data } = await axios.get("/api/v1/admin/users");
    dispatch(usersSuccess(data));
  } catch (error) {
    dispatch(usersFail(error.response.data.message));
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch(userRequest());
    const { data } = await axios.get(`/api/v1/admin/user/${id}`);
    dispatch(userSuccess(data));
  } catch (error) {
    dispatch(userFail(error.response.data.message));
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(deleteUserRequest());
    await axios.delete(`/api/v1/admin/user/${id}`);
    dispatch(deleteUserSuccess());
  } catch (error) {
    dispatch(deleteUserFail(error.response.data.message));
  }
};

export const updateUserAdmin = (id, formData) => async (dispatch) => {
  try {
    dispatch(updateUserRequestAdmin());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/user/${id}`,
      formData,
      config
    );
    dispatch(updateUserSuccessAdmin(data));
  } catch (error) {
    dispatch(updateUserFailAdmin(error.response.data.message));
  }
};
