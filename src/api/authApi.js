import axios from 'axios';
import { API_URL } from '../config';
export const authApi = {
    register: (data) => {
        return axios.post(`${API_URL}/register`, data);
    },
    login: (data) => {
        return axios.post(`${API_URL}/login`, data);
    },
    profile: (token) => {
        return axios.get(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
     forgotPassword: (data) => {
    // data: { email }
    return axios.post(`${API_URL}/forgot-password`, data);
  },

  // ----- Reset mật khẩu -----
  resetPassword: (data) => {
    // data: { email, token, newPassword }
    return axios.post(`${API_URL}/reset-password`, data);
  },
}
