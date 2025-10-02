import { useState } from "react"
import { getPrescriptionsApi } from "../services/prescriptions"

export const usePrescriptions = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const getPrescriptions = async () => {
        try {
            setError(null)
            setIsLoading(true)
            const prescriptions = await getPrescriptionsApi()            
            return prescriptions
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    return {
        error,
        isLoading,
        getPrescriptions,
    }
}