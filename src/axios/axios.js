import axios from 'axios'
export default axios.create({
    baseURL: 'http://bard2008:10280/api/v1' //'http://kc-11-158:8075/api/'
})