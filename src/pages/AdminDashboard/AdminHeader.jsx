import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useAdmin } from '../../../context/AdminContext'

function AdminHeader() {
  const { adminUser, logout } = useAdmin()
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de cerrar sesión?')) {
      logout()
      navigate('/login', { replace: true })
    }
  }

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showUserMenu])

  return (
    <header className="bg-gradient-to-r from-primary to-dark-gray text-white py-6 shadow-lg border-b-4 border-accent">
      <div className="container mx-auto px-4 flex items-center justify-between gap-8">
        <div className="flex-1">
          <h1 className="font-title text-4xl font-bold tracking-tight m-0">Panel de Administración</h1>
          <p className="text-sm text-white/80 mt-1 m-0">Gestiona tu inventario y productos</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative user-menu-container">
            <div 
              className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-xl font-bold text-white shadow-md cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
              onClick={() => setShowUserMenu(!showUserMenu)}
              role="button"
              tabIndex={0}
              aria-label="Menú de usuario"
            >
              {adminUser?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            
            {showUserMenu && (
              <div className="absolute top-[calc(100%+12px)] right-0 bg-white rounded-lg shadow-2xl min-w-[200px] overflow-hidden z-dropdown animate-fade-in">
                <div className="p-4 border-b border-light">
                  <p className="text-xs text-gray uppercase font-bold">Usuario</p>
                  <p className="text-sm text-primary truncate">{adminUser?.email}</p>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="w-full flex items-center gap-3 px-4 py-3 bg-white border-none text-error text-sm font-semibold cursor-pointer transition-colors text-left hover:bg-red-50"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader