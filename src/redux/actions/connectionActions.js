export const GET_CONNECTIONS_REQUEST = "GET_CONNECTIONS_REQUEST";
export const GET_CONNECTIONS_SUCCESS = "GET_CONNECTIONS_SUCCESS";
export const GET_CONNECTIONS_FAILURE = "GET_CONNECTIONS_FAILURE";

export const SEND_CONNECTION_REQUEST_REQUEST = "SEND_CONNECTION_REQUEST_REQUEST";
export const SEND_CONNECTION_REQUEST_SUCCESS = "SEND_CONNECTION_REQUEST_SUCCESS";
export const SEND_CONNECTION_REQUEST_FAILURE = "SEND_CONNECTION_REQUEST_FAILURE";

export const ACCEPT_CONNECTION_REQUEST_REQUEST = "ACCEPT_CONNECTION_REQUEST_REQUEST";
export const ACCEPT_CONNECTION_REQUEST_SUCCESS = "ACCEPT_CONNECTION_REQUEST_SUCCESS";
export const ACCEPT_CONNECTION_REQUEST_FAILURE = "ACCEPT_CONNECTION_REQUEST_FAILURE";

export const REJECT_CONNECTION_REQUEST_REQUEST = "REJECT_CONNECTION_REQUEST_REQUEST";
export const REJECT_CONNECTION_REQUEST_SUCCESS = "REJECT_CONNECTION_REQUEST_SUCCESS";
export const REJECT_CONNECTION_REQUEST_FAILURE = "REJECT_CONNECTION_REQUEST_FAILURE";

import axiosInstance from "../../utils/axiosInstance";

export const getConnections = (connectionId) => async (dispatch) => {
    dispatch({
        type: GET_CONNECTIONS_REQUEST,
    });
    try {
        const response = await axiosInstance.get(`/api/connections/connected/${connectionId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        dispatch({
            type: GET_CONNECTIONS_SUCCESS,
            payload: response.data.connections,
        });
    } catch (error) {
        dispatch({
            type: GET_CONNECTIONS_FAILURE,
            payload: error.message,
        });
    }
};

export const sendConnectionRequest = (connectionId) => async (dispatch) => {
    dispatch({
        type: SEND_CONNECTION_REQUEST_REQUEST,
    });
    console.log(connectionId);
    try {
        const response = await axiosInstance.post(`/api/connections/request/${connectionId}`, {},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        dispatch({
            type: SEND_CONNECTION_REQUEST_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: SEND_CONNECTION_REQUEST_FAILURE,
            payload: error.message,
        });
    }
};

export const acceptConnectionRequest = (connectionId) => async (dispatch) => {
    dispatch({
        type: ACCEPT_CONNECTION_REQUEST_REQUEST,
    });
    try {
        const response = await axiosInstance.post(`/api/connections/accept/${connectionId}`, {},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        dispatch({
            type: ACCEPT_CONNECTION_REQUEST_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ACCEPT_CONNECTION_REQUEST_FAILURE,
            payload: error.message,
        });
    }
};

export const rejectConnectionRequest = (connectionId) => async (dispatch) => {
    dispatch({
        type: REJECT_CONNECTION_REQUEST_REQUEST,
    });
    try {
        const response = await axiosInstance.post(`/api/connections/reject/${connectionId}`, {},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        dispatch({
            type: REJECT_CONNECTION_REQUEST_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: REJECT_CONNECTION_REQUEST_FAILURE,
            payload: error.message,
        });
    }
};