import { GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE } from "../actions/userActions";

const initialState = {
    loading: false,
    users: [],
    error: null,
    profile: null,
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case GET_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                profile: action.payload
            }
        case GET_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default userReducer