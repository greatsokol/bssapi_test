import {DOCS_BEGIN, DOCS_ERROR, DOCS_SELECT, DOCS_SUCCESS} from "../actions/actionTypes";

const initialState = {
    loading : true,
    fault: false,
    selectedIdr : null,
    recs: {}
};

export default function docListReducer(state = initialState, action) {
    switch (action.type) {
        case DOCS_BEGIN:
            return {
                ...state,
              loading: true,
              fault: false,
              recs: {}
            };
        case DOCS_ERROR:
            return {
                ...state,
                loading: false,
                fault: true,
                recs: {}
            };
        case DOCS_SUCCESS:
            return {
                ...state,
                loading: false,
                fault: false,
                recs: action.recs
            };
        case DOCS_SELECT:
            return {
                ...state,
                selectedIdr: action.selectedIdr
            };
        default:
            return state;
    }
}