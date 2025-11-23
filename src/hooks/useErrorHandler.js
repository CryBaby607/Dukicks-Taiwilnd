import { useState, useCallback } from 'react'
import { handleError as serviceHandleError } from '../services/errorService'

export const useErrorHandler = () => {
  const [error, setError] = useState(null)

  const handleError = useCallback((err, context) => {
    const message = serviceHandleError(err, context)
    setError(message)
    
    setTimeout(() => setError(null), 5000)
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return { error, handleError, clearError }
}