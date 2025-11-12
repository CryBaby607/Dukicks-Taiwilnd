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

// Calcula desglose de precio con descuento
export const getPriceBreakdown = (price, discount = 0) => {
  const discountAmount = Math.round((price * discount) / 100)
  const finalPrice = price - discountAmount

  return {
    original: formatPrice(price),
    originalRaw: price,
    discount,
    discountAmount,
    final: formatPrice(finalPrice),
    finalRaw: finalPrice,
    saved: formatPrice(discountAmount)
  }
}
