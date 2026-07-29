import { useState, useEffect, useCallback } from "react"
import api from "@config/api.js"

export const useCatalog = (catalogo) => {
    const [catalog, setCatalog] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchData = useCallback(async () => {
        if (!catalogo) return;
        try {
            setLoading(true)
            const response = await api.get(`/api/combo/${catalogo}`)
            setCatalog(response.data?.listado || [])
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }, [catalogo])

    useEffect(() => {
        fetchData()
    }, [fetchData])
    return {
        catalog,
        loading,
        error,
    }
}