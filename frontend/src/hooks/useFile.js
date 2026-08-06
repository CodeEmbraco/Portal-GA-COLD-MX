// Hook para el manejo de archivos (Subida, obtención y eliminación)
import { useState, useCallback } from "react";
import api from "@config/api.js";

export const useFile = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);

    // 1. GET: Obtiene los archivos asociados a una política por su ID
    const getFilesByPolicy = useCallback(async (politicaId) => {
        if (!politicaId) return [];
        setLoading(true);
        setError(null);

        try {
            const response = await api.get(`/api/archivo/getFilesByPolicy/${politicaId}`);
            const listado = response.data?.listado || [];
            setFiles(listado);
            return listado;
        } catch (err) {
            const msg = err.response?.data?.respuesta || err.message || 'Error al obtener los archivos';
            setError(msg);
            throw new Error(msg);
        } finally {
            setLoading(false);
        }
    }, []);

    // 2. POST: Registra o sube un nuevo archivo (Soporta FormData y JSON)
    const createFile = async (fileData) => {
        setLoading(true);
        setError(null);

        try {
            let response;
            // Si viene FormData (archivo físico), ajustamos el header multipart/form-data
            if (fileData instanceof FormData) {
                response = await api.post(`/api/archivo/uploadFile`, fileData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                response = await api.post(`/api/archivo/uploadFile`, fileData);
            }

            if (response.data.resultado === 200 || response.data.resultado === 201) {
                const nuevoArchivo = response.data?.objeto;
                if (nuevoArchivo) {
                    setFiles((prev) => [...prev, nuevoArchivo]);
                }
                return response.data;
            } else {
                throw new Error(response.data.respuesta || 'Error al registrar el archivo');
            }
        } catch (err) {
            const msg = err.response?.data?.respuesta || err.message || 'Error al registrar el archivo';
            setError(msg);
            throw new Error(msg);
        } finally {
            setLoading(false);
        }
    };

    // 3. PUT: Desactiva / Elimina un archivo (Soft Delete)
    const deleteFile = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.put(`/api/archivo/deleteFile/${id}`);
            if (response.data.resultado === 200) {
                setFiles((prev) => prev.filter((file) => file.id !== id));
                return response.data;
            } else {
                throw new Error(response.data.respuesta || 'Error al desactivar el archivo');
            }
        } catch (err) {
            const msg = err.response?.data?.respuesta || err.message || 'Error al desactivar el archivo';
            setError(msg);
            throw new Error(msg);
        } finally {
            setLoading(false);
        }
    };

    //4. Descarga del archivo
    const downloadFile = useCallback(async (archivo) => {
        if (!archivo?.ruta) {
            alert("La ruta del archivo no está disponible.");
            return;
        }

        setIsDownloading(true);
        try {
            // Petición con Axios y responseType 'blob'
            const response = await api.get(`/uploads/${archivo.ruta}`, {
                //El tipo de archivo descargado es blob
                responseType: 'blob',
                //y el encabezado para aceptar cualquier tipo de archivo, aun si solo estamos aceptando pdfs
                headers: {
                    'Accept': '*/*'
                }
            });

            // Extracción del nombre
            const nombreReal = archivo.ruta.split("/").pop().split("\\").pop();
            const fileName = nombreReal || archivo.codigo || 'documento.pdf';

            //Creación de URL temporal
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
            //Creación de enlace de descarga
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            //Simulación de clic para iniciar la descarga
            link.click();
            //Limpieza de memoria
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (err) {
            console.error("Error al descargar el documento:", err);
            alert("Error al descargar. Puede que no tengas permisos o el archivo no exista.");
        } finally {
            setIsDownloading(false);
        }
    }, []);

    const getFileBlobUrl = useCallback(async (archivo) => {
        if (!archivo?.ruta) return null;

        try {
            // Pedimos el archivo al backend exactamente igual que en downloadFile
            const response = await api.get(`/uploads/${archivo.ruta}`, {
                responseType: 'blob',
                headers: {
                    'Accept': '*/*'
                }
            });

            // Creamos un Blob y su URL binaria local temporal
            const blob = new Blob([response.data], { type: response.headers['content-type'] || 'application/pdf' });
            return window.URL.createObjectURL(blob);
        } catch (err) {
            console.error("Error al obtener la URL del archivo:", err);
            return null;
        }
    }, []);

    return {
        files,
        loading,
        error,
        getFilesByPolicy,
        createFile,
        deleteFile,
        downloadFile,
        isDownloading,
        getFileBlobUrl
    };
};

export default useFile;
