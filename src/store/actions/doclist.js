import axios from "../../axios/axios";
import {DOCS_BEGIN, DOCS_ERROR, DOCS_SELECT, DOCS_SUCCESS} from "./actionTypes";

export function getList(currentPage){
    return async dispatch =>{
        const sid = sessionStorage.getItem('sid');
        if (sid === '' || !sid){
            dispatch(docsError());
            return;
        }
        dispatch(docsBegin());
        axios.get(`/catalog/paydocru?sid=${sid}&pagenum=${currentPage}`)
            .then(response => {
                const data = response.data;
                dispatch(docsSuccess(data.recs, currentPage, Math.round(Number(data.recs.count)/data.recs.rec.length)));
            }).catch(e => {
                console.log('getList: error', e);
                dispatch(docsError());
            });
    }
}

function docsBegin() {
    return {
        type: DOCS_BEGIN
    }
}

function docsError(){
    sessionStorage.removeItem('sid');
    return {
        type: DOCS_ERROR
    }
}

function docsSuccess(recs, currentPage, totalPages){
    return {
        type: DOCS_SUCCESS,
        currentPage,
        totalPages,
        recs
    }
}

export function selectIdr(selectedIdr){
    return {
        type : DOCS_SELECT,
        selectedIdr
    }
}