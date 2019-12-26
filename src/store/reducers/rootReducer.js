import {combineReducers} from 'redux'
import authReducer from "./auth";
import docListReducer from "./doclist";

export default combineReducers({
    auth: authReducer,
    doclist: docListReducer
})