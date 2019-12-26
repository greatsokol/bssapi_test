import {AUTH_ERROR, AUTH_BEGIN_GETPID, AUTH_SUCCESS_GETPID, AUTH_BEGINLOGIN, AUTH_SUCCESS} from "../actions/actionTypes";

const initialState = {
    loading : true,
    pid : null,
    sid : null,
    fault: false
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_BEGIN_GETPID:
            return {
                ...state,
                loading: true,
                fault: false,
                pid: null,
                sid: null,
            };
        case AUTH_ERROR:
           return {
               ...state,
               loading: false,
               fault: true,
               pid: null,
               sid: null,
           };
        case AUTH_SUCCESS_GETPID:
            return {
                ...state,
                loading: false,
                fault: false,
                pid: action.pid,
                sid: null,
            };
        case AUTH_BEGINLOGIN:
            return {
                ...state,
                fault: false,
                sid: null,
                loading: true,
            };
        case AUTH_SUCCESS:
            return {
                ...state,
                fault: false,
                loading: false,
                sid: action.sid
            };
        default:
            return state;
    }
}