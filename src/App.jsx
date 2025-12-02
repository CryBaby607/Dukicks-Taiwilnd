import { Routes, Route, useLocation } from 'react-router-dom'
import './config/fontawesome'
import './styles/variables.css'
import './styles/typography.css'
import './styles/global.css'

import { CartProvider } from './context/CartContext'
import { AdminProvider } from './context/AdminContext'
import AdminRoute from './components/AdminRoute/AdminRoute'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary' // <--- AGREGADO

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Hombre from './pages/Category/Hombre'
import Mujer from './pages/Category/Mujer'
import Gorras from './pages/Category/Gorras'
import Cart from './pages/Cart/Cart'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Login from './pages/Login/Login'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'

export default function App() {
  const location = useLocation()
  const hideLayout = location.pathname === '/login' || location.pathname.startsWith('/admin')

  return (
    <ErrorBoundary> 
      <AdminProvider>
        <CartProvider>
          <div>
            {!hideLayout && <Header />}
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hombre" element={<Hombre />} />
                <Route path="/mujer" element={<Mujer />} />
                <Route path="/gorras" element={<Gorras />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route 
                  path="/admin" 
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } 
                />
              </Routes>
            </main>
            {!hideLayout && <Footer />}
          </div>
        </CartProvider>
      </AdminProvider>
    </ErrorBoundary>
  )
}