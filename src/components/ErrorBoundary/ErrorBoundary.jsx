import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-light p-8">
          <div className="text-center max-w-md bg-white p-12 rounded-2xl shadow-xl">
            <FontAwesomeIcon 
              icon={faExclamationTriangle} 
              className="text-5xl text-error mb-4"
            />
            <h1 className="text-3xl font-title font-bold text-primary mb-4">
              Algo salió mal
            </h1>
            <p className="text-base text-gray-600 leading-relaxed mb-8">
              Disculpa, ocurrió un error inesperado. Por favor, intenta recargar la página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-accent text-white font-bold rounded-lg text-base cursor-pointer transition-all duration-200 hover:bg-secondary hover:shadow-lg active:scale-95"
            >
              Recargar Página
            </button>
            
            <p className="mt-6 text-sm text-gray-400">
              Si el problema persiste, contacta con soporte.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary