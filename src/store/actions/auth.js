import axios from "../../axios/axios";
import {
    AUTH_BEGIN_GETPID,
    AUTH_BEGINLOGIN,
    AUTH_ERROR,
    AUTH_SUCCESS_GETPID,
    AUTH_SUCCESS,
} from "./actionTypes";

export function authGetP() {
    return async dispatch =>{
        dispatch(authBegin());
        axios.get('/user/plugin-password')
            .then(response => {
                const data = response.data;
                dispatch(gotPid(data.R.PID, data.R.P));
            }).catch(e => {
                console.log('authGetP: error', e);
                dispatch(authError());
            });
    }
}

export function login(pid, loginname, password) {
    return async dispatch =>{
        dispatch(authBeginLogin());
        axios.post('/user/login', `nm=${loginname}&pw=${password}&pid=${pid}`)
            .then(response => {
                const data = response.data;
                dispatch(loggedIn(data.R.S));
            }).catch(e => {
                console.log('authGetP: error', e);
                dispatch(authError());
            });
    }
}

function authBegin() {
    sessionStorage.removeItem('pid');
    sessionStorage.removeItem('sid');
    return {
        type: AUTH_BEGIN_GETPID
    }
}

function authBeginLogin(){
    sessionStorage.removeItem('sid');
    return {
        type: AUTH_BEGINLOGIN
    }
}

function authError() {
    sessionStorage.removeItem('pid');
    sessionStorage.removeItem('sid');
    return {
        type: AUTH_ERROR
    }
}

function gotPid(pid) {
    sessionStorage.setItem('pid', pid);
    return {
        type: AUTH_SUCCESS_GETPID,
        pid
    }
}

function loggedIn(sid) {
    sessionStorage.setItem('sid', sid);
    return {
        type: AUTH_SUCCESS,
        sid
    }
}