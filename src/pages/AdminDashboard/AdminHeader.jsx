import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faBoxOpen, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useAdmin } from '../../context/AdminContext'

function AdminHeader() {
  const { logout } = useAdmin()
  const navigate = useNavigate()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de cerrar sesión?')) {
      logout()
      navigate('/login', { replace: true })
    }
  }

  return (
    <>
      {/* === MOBILE TOP BAR === */}
      <div className="md:hidden bg-primary text-white p-4 flex justify-between items-center shadow-md fixed top-0 left-0 right-0 z-40">
        <div className="font-title text-xl font-bold tracking-tight">
          <span className="text-white">DU</span>
          <span className="text-accent">KICKS</span>
        </div>
        <button onClick={() => setIsMobileOpen(true)} className="text-2xl focus:outline-none">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {/* === OVERLAY === */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fade-in"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* === SIDEBAR === */}
      <aside className={`
        fixed top-0 bottom-0 left-0 w-64 bg-gradient-to-b from-primary to-dark-gray text-white z-50
        flex flex-col shadow-2xl transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* Header del Sidebar */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <div className="font-title text-3xl font-bold tracking-tight">
            <span className="text-white">DU</span>
            <span className="text-accent">KICKS</span>
          </div>
          {/* Botón cerrar móvil */}
          <button onClick={() => setIsMobileOpen(false)} className="md:hidden text-white/70 hover:text-white">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        {/* Navegación Principal (Ahora sube y ocupa más espacio) */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          <p className="px-4 text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Menu</p>
          
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-accent text-white rounded-lg font-semibold shadow-lg shadow-accent/20 transition-all hover:bg-secondary">
            <FontAwesomeIcon icon={faBoxOpen} />
            <span>Inventario</span>
          </button>
        </nav>

        {/* Footer del Sidebar */}
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 text-error/90 hover:text-white hover:bg-error rounded-lg font-semibold transition-all"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Cerrar Sesión</span>
          </button>
        </div>

      </aside>
    </>
  )
}

export default AdminHeader