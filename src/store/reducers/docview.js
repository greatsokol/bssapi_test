import {DOC_BEGIN, DOC_ERROR, DOC_SUCCESS} from "../actions/actionTypes";

const initialState = {
    loading : true,
    fault: false,
    rec : {}
};

export default function docViewReducer(state = initialState, action) {
    switch (action.type) {
        case DOC_BEGIN:
            return {
                loading: true,
                fault: false,
                rec : {}
            };
        case DOC_ERROR:
            return {
                loading: false,
                fault: true,
                rec : {}
            };
        case DOC_SUCCESS:
            return {
                loading: false,
                fault: false,
                rec: action.rec
            };
        default:
            return state;
    }
}