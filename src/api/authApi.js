import axios from 'axios';
import { API_URL } from '../config';
export const authApi = {
    register: (data) => {
        axios.post(`${API_URL}/register`, data);
    },
    login: (data) => {
        axios.post(`${API_URL}/login`, data);
    },
    profile: (token) => {
        return axios.get(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
}