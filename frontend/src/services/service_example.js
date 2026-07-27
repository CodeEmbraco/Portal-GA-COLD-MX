/*
    Plantilla para crear la comunicacion entre el frontend y el backend. 
    Tomaremos como base este documento para crear un service por cada entidad de la base de datos.
    TODO: Es necesaria la libreria de 'axios'
*/
//Importamos axios
import axios from 'axios';

//Instanciamos axios
const api = axios.create({
    baseURL: import.meta.env.BACKEND_URL || 'http:\\localhost:3001',
    headers: { 'Content-Type': 'application/json' }
})

//Service
const example_service = {
    //Ejemplo de método get 
    example_get: async (param) => {
        const response = await api.get(`/url`, { params: param }); //El para, se manda por la URL, el backend recibe el parámetro com req.query
        return response.data;   //Regresamos la respuesta del backend, usualmente un JSON
    },
    //Ejemplo de método post
    example_post: async (data, param) => {
        const response = await api.post(`/url`, data, { params: param }); //El dato se manda por el body, y el parámetro por la URL
        return response.data;
    },
    //Ejemplo de método put
    example_put: async (data, param) => {
        const response = await api.put(`/url`, data, { params: param }); //El dato se manda por el body, y el parámetro por la URL
        return response.data;
    },
    //Ejemplo de método delete
    example_delete: async (data, param) => {
        const response = await api.delete(`/url`, data, { params: param }); //El dato se manda por el body, y el parámetro por la URL
        return response.data;
    }
}

export default example_service; //Exportamos el servicio para que lo podamos mandar a llamar en otros scripts como una función

