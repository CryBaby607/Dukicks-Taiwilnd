// Verifica si un item del carrito es válido
export const isValidCartItem = (item) => (
  item &&
  typeof item.id === 'number' && item.id > 0 &&
  typeof item.price === 'number' && item.price > 0 &&
  typeof item.quantity === 'number' && item.quantity > 0 && item.quantity <= 99 &&
  typeof item.name === 'string' && !!item.name
)

// Calcula el precio total de un item
export const calculateItemTotal = (item) =>
  isValidCartItem(item) ? item.price * item.quantity : 0

// Calcula el subtotal del carrito
export const calculateCartSubtotal = (cartItems) => {
  if (!Array.isArray(cartItems)) return 0
  return cartItems.reduce((sum, item) => sum + calculateItemTotal(item), 0)
}

// Cuenta la cantidad total de unidades en el carrito
export const calculateCartItemCount = (cartItems) => {
  if (!Array.isArray(cartItems)) return 0
  return cartItems.reduce(
    (count, item) => count + (isValidCartItem(item) ? item.quantity : 0),
    0
  )
}

// Encuentra el índice de un producto por ID
const findCartItemIndex = (cartItems, productId) =>
  cartItems.findIndex(item => item.id === productId)

// Agrega un producto o incrementa su cantidad
export const addOrUpdateCartItem = (cartItems, product) => {
  if (!product?.id) throw new Error('Producto inválido: falta ID')

  const index = findCartItemIndex(cartItems, product.id)
  const newItems = [...cartItems]

  if (index > -1) {
    newItems[index] = {
      ...newItems[index],
      quantity: Math.min(newItems[index].quantity + 1, 99)
    }
  } else {
    newItems.push({ ...product, quantity: 1 })
  }

  return newItems
}

// Actualiza la cantidad de un producto
export const updateCartItemQuantity = (cartItems, productId, quantity) => {
  if (quantity < 1 || quantity > 99 || !Number.isInteger(quantity))
    throw new Error('Cantidad debe estar entre 1 y 99 (entero)')

  const index = findCartItemIndex(cartItems, productId)
  if (index === -1) throw new Error('Producto no encontrado en el carrito')

  const newItems = [...cartItems]
  newItems[index] = { ...newItems[index], quantity }
  return newItems
}

// Elimina un producto del carrito
export const removeCartItem = (cartItems, productId) =>
  cartItems.filter(item => item.id !== productId)

// Vacía el carrito
export const clearCart = () => []

// Devuelve un resumen general del carrito
export const getCartSummary = (cartItems) => {
  const subtotal = calculateCartSubtotal(cartItems)
  const itemCount = calculateCartItemCount(cartItems)
  return {
    subtotal,
    total: subtotal, // En futuro: + impuestos, envío, etc.
    itemCount,
    items: cartItems.length,
    isEmpty: cartItems.length === 0,
    averagePrice: itemCount > 0 ? Math.round(subtotal / itemCount) : 0
  }
}

// Valida que todos los items del carrito sean válidos
export const validateCart = (cartItems) => {
  const errors = []
  const invalidItems = []

  if (!Array.isArray(cartItems)) {
    return { valid: false, errors: ['Carrito debe ser un array'], invalidItems: [] }
  }

  cartItems.forEach((item, index) => {
    if (!isValidCartItem(item)) {
      invalidItems.push({ index, id: item?.id, error: `Item inválido en posición ${index}` })
    }
  })

  if (invalidItems.length > 0) errors.push(`${invalidItems.length} items inválidos`)

  return { valid: errors.length === 0, errors, invalidItems }
}

// Busca un producto en el carrito
export const findCartItem = (cartItems, productId) => {
  const index = findCartItemIndex(cartItems, productId)
  return index > -1 ? cartItems[index] : null
}

// Verifica si un producto ya está en el carrito
export const isProductInCart = (cartItems, productId) =>
  findCartItemIndex(cartItems, productId) > -1
