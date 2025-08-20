import {create} from 'zustand';
import { authApi} from '../api/authApi';

export const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem('token') || null,
    login: async (email, password) =>{
        const res = await authApi.login({email, password});
        localStorage.setItem('token', res.data.token);
        set({ user: res.data.user, token: res.data.token });
    },
    register: async (email, password) => {
        const res = await authApi.register({email, password});
    },
    fetchProfile: async (token) => {
        const res = await authApi.profile(token);
        set({ user: res.data });
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
    },
}));