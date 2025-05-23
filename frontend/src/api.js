// handles all async calls (user input. ie, file upload)

import axios from 'axios';

const API_BASE = 'http://localhost:8000'; // to change in future

// send file to backend
export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`${API_BASE}/process-file`, formData); // sends file name to be processed by backend
};

// get columns using backend
export const getColumns = (session_id) => axios.get(`${API_BASE}/columns/available`, {params: {session_id}});

// post config
export const postConfig = (session_id, config) => axios.post(`${API_BASE}/columns/config`, config, {params: {session_id}});

// get full data specified by columns
export const getData = (session_id) => {
    return axios.get(`${API_BASE}/data`, {params: {session_id}});
};