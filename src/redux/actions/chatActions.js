import axiosInstance from "../../utils/axiosInstance";

export const SEND_CHAT_MESSAGE_REQUEST = "SEND_CHAT_MESSAGE_REQUEST";
export const SEND_CHAT_MESSAGE_SUCCESS = "SEND_CHAT_MESSAGE_SUCCESS";
export const SEND_CHAT_MESSAGE_FAILURE = "SEND_CHAT_MESSAGE_FAILURE";

export const GET_CHAT_MESSAGES_REQUEST = "GET_CHAT_MESSAGES_REQUEST";
export const GET_CHAT_MESSAGES_SUCCESS = "GET_CHAT_MESSAGES_SUCCESS";
export const GET_CHAT_MESSAGES_FAILURE = "GET_CHAT_MESSAGES_FAILURE";

export const sendChatMessage = (messageData) => async (dispatch) => {
    dispatch({
        type: SEND_CHAT_MESSAGE_REQUEST,
    });
    try {
        const response = await axiosInstance.post("/api/chat", messageData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        dispatch({
            type: SEND_CHAT_MESSAGE_SUCCESS,
            payload: response.data.chat,
        });
    } catch (error) {
        dispatch({
            type: SEND_CHAT_MESSAGE_FAILURE,
            payload: error.message,
        });
    }
};

export const getChatMessages = (connectionId) => async (dispatch) => {
    dispatch({
        type: GET_CHAT_MESSAGES_REQUEST,
    });
    try {
        const response = await axiosInstance.get(`/api/chats/${connectionId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        dispatch({
            type: GET_CHAT_MESSAGES_SUCCESS,
            payload: response.data.chats,
        });
    } catch (error) {
        dispatch({
            type: GET_CHAT_MESSAGES_FAILURE,
            payload: error.message,
        });
    }
};
