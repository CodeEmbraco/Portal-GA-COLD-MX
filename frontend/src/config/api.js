import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-user-data': sessionStorage.getItem('userInfo')
    },
});

// Interceptor de Petición (Request)
api.interceptors.request.use(
    (config) => {
        // Aquí puedes obtener el token de localStorage, cookies o tu estado global
        const token = sessionStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de Respuesta (Response)
api.interceptors.response.use(
    (response) => {
        // Si la petición es exitosa, devolvemos directamente los datos
        return response;
    },
    (error) => {
        // Manejo de errores globales
        if (error.response) {
            if (error.response.status === 401) {
                // Ejemplo: El token expiró. Aquí podrías redirigir al login
                console.error('Sesión expirada. Por favor, inicia sesión de nuevo.');
                // window.location.href = '/login';
            } else if (error.response.status === 500) {
                console.error('Error interno del servidor');
            }
        }
        return Promise.reject(error);
    }
);

export default api;