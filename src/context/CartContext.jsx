import { createContext, useContext, useState } from 'react'

// Crear el contexto
const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  // ACCIONES DEL CARRITO
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find(item => item.id === product.id)
      if (existing) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, 99) }
            : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1 || quantity > 99) return
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId))
  }

  const clearCart = () => setCartItems([])

  // CÁLCULOS DERIVADOS
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const total = subtotal
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const isEmpty = cartItems.length === 0

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isEmpty,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart debe usarse dentro de CartProvider')
  return context
}
