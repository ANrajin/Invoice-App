import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001', // Assuming backend runs on port 3001
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
