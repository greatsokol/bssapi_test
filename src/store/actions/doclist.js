import axios from "../../axios/axios";
import {DOCS_BEGIN, DOCS_ERROR, DOCS_SUCCESS} from "./actionTypes";

export function getList(){
    return async dispatch =>{
        const sid = sessionStorage.getItem('sid');
        if (sid === '' || !sid){
            dispatch(docsError());
            return;
        }
        dispatch(docsBegin());
        axios.get(`/catalog/paydocru?sid=${sid}`)
            .then(response => {
                const data = response.data;
                dispatch(docsSuccess(data.recs));
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

function docsSuccess(recs){
    return {
        type: DOCS_SUCCESS,
        recs
    }
}