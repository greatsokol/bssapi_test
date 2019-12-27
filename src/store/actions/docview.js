import axios from "../../axios/axios";
import {DOC_BEGIN, DOC_ERROR, DOC_SUCCESS} from "./actionTypes";

export function getDoc(recordId) {
    return async dispatch =>{
        const sid = sessionStorage.getItem('sid');
        if (recordId === '' || !recordId || sid === '' || !sid){
            dispatch(docError());
            return;
        }
        dispatch(docBegin());
        axios.get(`/catalog/paydocru/${recordId}?sid=${sid}`)
            .then(response => {
                const data = response.data;
                dispatch(docSuccess(data.rec));
            }).catch(e => {
            console.log('getList: error', e);
            dispatch(docError());
        });
    }
}

function docError(){
    return {
        type: DOC_ERROR
    }
}

function docBegin() {
    return {
        type: DOC_BEGIN
    }
}

function docSuccess(rec){
    return {
        type: DOC_SUCCESS,
        rec
    }
}