import {DOCS_BEGIN, DOCS_ERROR, DOCS_SUCCESS} from "../actions/actionTypes";

const initialState = {
    loading : true,
    fault: false,
    recs: {}
};

export default function docListReducer(state = initialState, action) {
    switch (action.type) {
        case DOCS_BEGIN:
            return {
              loading: true,
              fault: false,
              recs: {}
            };
        case DOCS_ERROR:
            return {
                loading: false,
                fault: true,
                recs: {}
            };
        case DOCS_SUCCESS:
            return {
                loading: false,
                fault: false,
                recs: action.recs
            };
        default:
            return state;
    }
}