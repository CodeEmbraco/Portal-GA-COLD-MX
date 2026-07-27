import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.BACKEND_URL || 'http:\\localhost:3001',
    headers: { 'Content-Type': 'application/json' }
})

//Entidades
const entidadService = {
    getDepartamentos: async () => {
        const response = await api.get(`/entidades/get`);
        return response.data;
    },
}

export default entidadService;