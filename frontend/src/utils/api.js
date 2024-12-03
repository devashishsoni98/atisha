import axios from 'axios';

const apibackend = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apibackend;
