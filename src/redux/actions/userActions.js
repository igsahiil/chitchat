export const GET_USERS_REQUEST = "GET_USERS_REQUEST"
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS"
export const GET_USERS_FAILURE = "GET_USERS_FAILURE"

export const GET_PROFILE_REQUEST = "GET_PROFILE_REQUEST"
export const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS"
export const GET_PROFILE_FAILURE = "GET_PROFILE_FAILURE"

import axiosInstance from "../../utils/axiosInstance";

export const getUsers = () => async (dispatch) => {
  dispatch({
    type: GET_USERS_REQUEST,
  });

  try {
    const response = await axiosInstance.get("/api/users",{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data.users,
    });
  } catch (error) {
    dispatch({
      type: GET_USERS_FAILURE,
      payload: error.response?.data || "Get users failed",
    });
  }
};


export const getProfile = () => async (dispatch) => {
  dispatch({
    type: GET_PROFILE_REQUEST,
  });
  try {
    const response = await axiosInstance.get("/api/profile",{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: response.data.user,
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: error.response?.data || "Get profile failed",
    });
  }
};