import { GET_CONNECTIONS_REQUEST, GET_CONNECTIONS_SUCCESS, GET_CONNECTIONS_FAILURE } from "../actions/connectionActions";
import { SEND_CONNECTION_REQUEST_FAILURE,SEND_CONNECTION_REQUEST_REQUEST, SEND_CONNECTION_REQUEST_SUCCESS } from "../actions/connectionActions";
import { ACCEPT_CONNECTION_REQUEST_FAILURE,ACCEPT_CONNECTION_REQUEST_REQUEST, ACCEPT_CONNECTION_REQUEST_SUCCESS } from "../actions/connectionActions";
import { REJECT_CONNECTION_REQUEST_FAILURE,REJECT_CONNECTION_REQUEST_REQUEST, REJECT_CONNECTION_REQUEST_SUCCESS } from "../actions/connectionActions";

const initialState = {
    loading: false,
    connections: [],
    error: null,
};

const connectionReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CONNECTIONS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_CONNECTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                connections: action.payload
            }
        case GET_CONNECTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SEND_CONNECTION_REQUEST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SEND_CONNECTION_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case SEND_CONNECTION_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ACCEPT_CONNECTION_REQUEST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ACCEPT_CONNECTION_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case ACCEPT_CONNECTION_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case REJECT_CONNECTION_REQUEST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case REJECT_CONNECTION_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case REJECT_CONNECTION_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default connectionReducer