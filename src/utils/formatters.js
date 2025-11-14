// Formatea un número como moneda mexicana (MXN)
export const formatPrice = (price) => {
  if (typeof price !== 'number' || price < 0) {
    console.warn('formatPrice recibió valor inválido:', price)
    return '$0'
  }

  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

// Formatea un array de precios
export const formatPrices = (prices) => {
  if (!Array.isArray(prices)) return []
  return prices.map(formatPrice)
}

// ✅ NUEVO: Calcula el precio con descuento aplicado
export const calculateDiscountedPrice = (price, discount = 0) => {
  if (typeof price !== 'number' || price < 0) {
    console.warn('calculateDiscountedPrice: precio inválido', price)
    return price || 0
  }

  if (typeof discount !== 'number' || discount < 0 || discount > 100) {
    console.warn('calculateDiscountedPrice: descuento inválido', discount)
    return price
  }

  if (discount === 0) return price

  return Math.round(price * (1 - discount / 100))
}

// ✅ NUEVO: Calcula el monto ahorrado
export const calculateSavings = (price, discount = 0) => {
  if (!discount || discount === 0) return 0
  
  const discountedPrice = calculateDiscountedPrice(price, discount)
  return price - discountedPrice
}

// Calcula desglose completo de precio con descuento
export const getPriceBreakdown = (price, discount = 0) => {
  const finalPrice = calculateDiscountedPrice(price, discount)
  const saved = calculateSavings(price, discount)

  return {
    original: formatPrice(price),
    originalRaw: price,
    discount,
    discountAmount: saved,
    final: formatPrice(finalPrice),
    finalRaw: finalPrice,
    saved: formatPrice(saved),
    hasDiscount: discount > 0
  }
}

// ✅ NUEVO: Obtiene el precio final (con o sin descuento)
export const getFinalPrice = (product) => {
  if (!product) return 0
  
  const price = product.price || 0
  const discount = product.discount || 0
  
  return calculateDiscountedPrice(price, discount)
}

// ✅ NUEVO: Formatea el precio final de un producto
export const formatProductPrice = (product) => {
  return formatPrice(getFinalPrice(product))
}