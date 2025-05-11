// src/api/axios.ts
import axios from 'axios';

// Створення окремого інстансу Axios
const api = axios.create({
    baseURL: import.meta.env["VITE_API_BASE_URL"],
    headers: {
        'Content-Type': 'application/json',
    },
});

// Якщо токен доступний у змінній середовища — додаємо в Authorization
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Інтерцептор для відповіді (обробка помилок)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API error:', error.response?.data || error.message);

        // Можна виводити повідомлення користувачу через toast
        // toast.error(error.response?.data?.message || 'Unknown error'

        return Promise.reject(error);
    }
);

export default api;
