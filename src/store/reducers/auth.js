import {
    AUTH_ERROR,
    AUTH_BEGIN_GETPID,
    AUTH_SUCCESS_GETPID,
    AUTH_BEGINLOGIN,
    AUTH_SUCCESS,
    AUTH_CLEAR_FAULT,
    AUTH_LOGOUT_SUCCESS, AUTH_BEGIN_LOGOUT,
} from "../actions/actionTypes";

const initialState = {
    loading : false,
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
        case AUTH_CLEAR_FAULT: {
            return {
                ...state,
                fault: false
            }
        }
        case AUTH_BEGIN_LOGOUT:{
            return {
                ...state,
                loading: true
            }
        }
        case AUTH_LOGOUT_SUCCESS:{
            return {
                ...state,
                loading: false,
                fault: false,
                pid: null,
                sid: null,
            }
        }
        default:
            return state;
    }
}