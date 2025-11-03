import axios from 'axios';
const API_URL = process.env.REACT_APP_API_VACANTES_URL;

const axiosInstance = axios.create({
    baseURL: API_URL, 
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
