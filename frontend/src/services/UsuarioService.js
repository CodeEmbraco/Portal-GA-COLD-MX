import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.BACKEND_URL || 'http:\\localhost:3001',
    headers: { 'Content-Type': 'application/json' }
})

//Entidades
const usuarioService = {
    authenticate_user: async (login) => {
        const response = await api.post(`/user/authenticate`, login);
        return response.data;
    },
}

export default usuarioService;