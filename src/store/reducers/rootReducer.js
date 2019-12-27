import {combineReducers} from 'redux'
import authReducer from "./auth";
import docListReducer from "./doclist";
import docViewReducer from "./docview";

export default combineReducers({
    auth: authReducer,
    doclist: docListReducer,
    docview: docViewReducer
})