import {AUTH_SUCCESS, LOG_OUT} from "../actions/actionTypes";

const initialState = {
    token: null
}

export default function authReducer(state = initialState, action) {

    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state, token: action.idToken
            }
        case LOG_OUT:
            return {
                ...state, token: null
            }
        default:
            return state
    }

}