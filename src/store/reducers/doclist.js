import {DOCS_BEGIN, DOCS_ERROR, DOCS_SELECT, DOCS_SUCCESS} from "../actions/actionTypes";

const initialState = {
    loading : true,
    fault: false,
    selectedIdr : null,
    currentPage: 1,
    totalPages: 0,
    recs: {}
};

export default function docListReducer(state = initialState, action) {
    switch (action.type) {
        case DOCS_BEGIN:
            return {
                ...state,
              loading: true,
              fault: false,
              currentPage: 1,
              totalPages: 0,
              recs: {}
            };
        case DOCS_ERROR:
            return {
                ...state,
                loading: false,
                fault: true,
                currentPage: 1,
                totalPages: 0,
                recs: {}
            };
        case DOCS_SUCCESS:
            return {
                ...state,
                loading: false,
                fault: false,
                currentPage: action.currentPage,
                totalPages: action.totalPages,
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