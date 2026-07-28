import api from "@config/api.js";

//Modulo de Politicas
const politicaService = {
    //Por el body debe de enviar el departamento y el rol del usuario. El id del usuario tambien podria agregar una capa mas de seguridad.
    getPoliticas: async (body) => {
        const response = await api.get(`/api/politicas`, body);
        return response.data;
    },
    createPolitica: async (politica) => {
        const response = await api.post(`/api/politicas`, politica);
        return response.data;
    },
    updatePolitica: async (politica) => {
        const response = await api.put(`/api/politicas/${politica.id}`, politica);
        return response.data;
    },
    deletePolitica: async (id) => {
        const response = await api.delete(`/api/politicas/${id}`);
        return response.data;
    },

}

export default politicaService;