//Creamos el hook para la autenticacion del usuario
import { useState } from "react";
//Importamos la instancia de axios en api.js
import api from "@config/api.js";

export const useAuthenticated = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    //POST Inicia sesion
    const login = async (credentials) => {
        const response = await api.post(`/api/auth/login`, credentials);
        //Si el login es exitoso, se establece la variable de estado isAuthenticated en true
        if (response.data.resultado === 200) {
            setIsAuthenticated(true);
            //Creamos la información del usuario según la estructura del backend (rol y departamento)
            const userInfo = {
                id: response.data.objeto.usuario.id,
                correo: response.data.objeto.usuario.correo,
                rol: response.data.objeto.usuario.rol?.[0]?.rol,
                departamento: response.data.objeto.usuario.departamento?.[0]?.id,
            };
            //Guardamos en sessionStorage
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        } else {
            setIsAuthenticated(false);
        }

        //Retornamos los datos de la respuesta
        return response.data;
    }

    return {
        isAuthenticated,
        login,
    };
};