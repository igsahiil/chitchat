import axiosInstance from "../../utils/axiosInstance";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

import { toast } from "react-hot-toast";

export const login = (user, navigate) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
    payload: user,
  });

  try {
    const response = await axiosInstance.post("/auth/login", user);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
    // const user = response.data.user;
    toast.success("Welcome " + response.data.user.username + "! Login success");
    localStorage.setItem("token", response.data.token);
    navigate("/");
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data || "Login failed",
    });

    toast.error(error.response?.data?.message || "Login failed");
  }
};

export const register = (user, navigate) => async (dispatch) => {
  dispatch({
    type: REGISTER_REQUEST,
    payload: user,
  });

  try {
    const response = await axiosInstance.post("/auth/register", user);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
    toast.success("Register success");
    localStorage.setItem("token", response.data.token);
    navigate("/login");
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data || "Register failed",
    });
    toast.error(error.response?.data?.message || "Register failed");
  }
};