//Creamos el hook para obtener la informacion del servicio de Politicas
import { useState, useEffect, useCallback } from "react"
import api from "@config/api.js"

export const usePolicies = () => {
    const [policies, setPolicies] = useState([]);
    const [isoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    //El fetch leera el sessionStorage y mandara la informacion del usuario loggeado por medio de los headers
    //Si no hay usuario loggeado, solo mandara las politicas publicas
    const userInfo = sessionStorage.getItem('userInfo')
    const headers = {
        'Content-Type': 'application/json',
        'x-user-data': JSON.stringify(userInfo)
    }

    //GET:Obtiene las politicas
    const fetchPolicies = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.get(`/api/politica/getAllPolicies`, headers)
            setPolicies(response.data?.listado || []);
        } catch (error) {
            setError(error.response?.data?.message || 'Error al obtener las politicas');
        } finally {
            setIsLoading(false);
        }
    }, [])

    //POST: Crea una politica
    const createPolicy = async (newPolicyData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.post(`/api/politica/createPolicy`, newPolicyData);
            setPolicies((prevPolicies) => [...prevPolicies, response.data]);
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || 'Error al crear la politica');
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    //PUT: Actualiza una politica
    const updatePolicy = async (id, updatePolicyData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.put(`/api/politica/updatePolicy/${id}`, updatePolicyData);
            setPolicies((prevPolicies) => prevPolicies.map((p) => p.id === id ? response.data : p));
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || 'Error al actualizar la politica');
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    //DELETE: Elimina una politica
    const deletePolicy = async (id) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.delete(`/api/politica/deletePolicy/${id}`);
            setPolicies((prevPolicies) => prevPolicies.filter((p) => p.id !== id));
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || 'Error al eliminar la politica');
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    //Effect: Obtiene las politicas al montar el componente
    useEffect(() => {
        fetchPolicies();
    }, [])

    return {
        policies,
        isoading,
        error,
        fetchPolicies,
        createPolicy,
        updatePolicy,
        deletePolicy,
    };
};