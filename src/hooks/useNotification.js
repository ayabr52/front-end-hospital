import { useState } from "react"
import { getNotification } from "../services/notification"

export const useNotification = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const getNotifications = async () => {
        try {
            setError(null)
            setIsLoading(true)
            const notifications = await getNotification()            
            return notifications
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    return {
        error,
        isLoading,
        getNotifications,
    }
}