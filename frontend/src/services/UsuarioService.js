import api from "@config/api.js";

//Modulo de Usuarios
const usuarioService = {
    autenticarUsuario: async (login) => {
        const response = await api.post(`/api/auth/login`, login);
        return response.data;
    },

}

export default usuarioService;