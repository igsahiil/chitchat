import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from "../actions/authActions";

const initialState = {
    loading: false,
    isAuthenticated: false,
    user: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null
            }
        default:
            return state
    }
}

export default authReducer