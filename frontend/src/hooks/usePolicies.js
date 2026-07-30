//Creamos el hook para obtener la informacion del servicio de Politicas
import { useState, useEffect, useCallback } from "react"
import api from "@config/api.js"

export const usePolicies = () => {
    const [policies, setPolicies] = useState([]);
    const [isoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    //GET: Obtiene las políticas
    const fetchPolicies = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.get(`/api/politica/getAllPolicies`);
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
            if (response.data.resultado === 200 || response.data.resultado === 201) {
                await fetchPolicies();
            } else {
                throw new Error(response.data.respuesta || 'Error al crear la política');
            }
            return response.data;
        } catch (error) {
            const msg = error.response?.data?.respuesta || error.message || 'Error al crear la política';
            setError(msg);
            throw new Error(msg);
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
            if (response.data.resultado === 200) {
                await fetchPolicies();
            } else {
                throw new Error(response.data.respuesta || 'Error al actualizar la política');
            }
            return response.data;
        } catch (error) {
            const msg = error.response?.data?.respuesta || error.message || 'Error al actualizar la política';
            setError(msg);
            throw new Error(msg);
        } finally {
            setIsLoading(false);
        }
    }

    //DELETE: Elimina una politica
    const deletePolicy = async (id) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.put(`/api/politica/deletePolicy/${id}`);
            if (response.data.resultado === 200) {
                setPolicies((prevPolicies) => prevPolicies.filter((p) => p.id !== id));
            } else {
                throw new Error(response.data.respuesta || 'Error al eliminar la política');
            }
            return response.data;
        } catch (error) {
            const msg = error.response?.data?.respuesta || error.message || 'Error al eliminar la política';
            setError(msg);
            throw new Error(msg);
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