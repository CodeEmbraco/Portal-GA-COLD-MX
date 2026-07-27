import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.BACKEND_URL || 'http:\\localhost:3001',
    headers: { 'Content-Type': 'application/json' }
})

//Departamentos
const departamentoService = {
    getDepartamentos: async () => {
        const response = await api.get(`/departamentos/get`);
        return response.data;
    },
}

export default departamentoService;