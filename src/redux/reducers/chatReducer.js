import {
    SEND_CHAT_MESSAGE_REQUEST,
    SEND_CHAT_MESSAGE_SUCCESS,
    SEND_CHAT_MESSAGE_FAILURE,
    GET_CHAT_MESSAGES_REQUEST,
    GET_CHAT_MESSAGES_SUCCESS,
    GET_CHAT_MESSAGES_FAILURE,
} from "../actions/chatActions";

const initialState = {
    loading: false,
    messages: [],
    error: null,
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_CHAT_MESSAGE_REQUEST:
        case GET_CHAT_MESSAGES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SEND_CHAT_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                messages: [...state.messages, action.payload],
            };
        case GET_CHAT_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                messages: action.payload,
            };
        case SEND_CHAT_MESSAGE_FAILURE:
        case GET_CHAT_MESSAGES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default chatReducer;