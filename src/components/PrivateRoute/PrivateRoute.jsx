import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  // Mientras se verifica la autenticación
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <p style={{ fontSize: '18px', color: '#6c757d' }}>Verificando acceso...</p>
      </div>
    )
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  // Si está autenticado, mostrar el contenido
  return children
}

export default PrivateRoute