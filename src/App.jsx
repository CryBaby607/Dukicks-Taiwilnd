import { Routes, Route } from 'react-router-dom'
import './config/fontawesome'
import './styles/variables.css'
import './styles/typography.css'
import './styles/global.css'

import { CartProvider } from './context/CartContext'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Hombre from './pages/Category/Hombre'
import Mujer from './pages/Category/Mujer'
import Gorras from './pages/Category/Gorras'
import Cart from './pages/Cart/Cart'
import ProductDetail from './pages/ProductDetail/ProductDetail'

export default function App() {
  return (
    <CartProvider>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hombre" element={<Hombre />} />
            <Route path="/mujer" element={<Mujer />} />
            <Route path="/gorras" element={<Gorras />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}