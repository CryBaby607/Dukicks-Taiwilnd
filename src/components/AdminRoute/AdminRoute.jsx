import { Navigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

function AdminRoute({ children }) {
  const { isAdminAuthenticated, loading } = useAdmin()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light">
        <p className="text-lg text-gray">Verificando acceso...</p>
      </div>
    )
  }

  if (!isAdminAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default AdminRoute