// Obtiene marcas únicas de los productos
export const getUniqueBrands = (products, includeAll = true) => {
  if (!Array.isArray(products)) return includeAll ? ['Todas'] : []

  const brands = [...new Set(products.map(p => p?.brand).filter(Boolean))].sort()
  return includeAll ? ['Todas', ...brands] : brands
}

// Filtra productos por marca (string o array)
export const filterByBrand = (products, brands) => {
  if (!Array.isArray(products)) return []

  if (!brands || brands === 'Todas' ||
      (Array.isArray(brands) && brands.includes('Todas'))) {
    return products
  }

  const brandArray = Array.isArray(brands) ? brands : [brands]
  return products.filter(p => brandArray.includes(p.brand))
}

// Obtiene el rango de precios { min, max }
export const getPriceRange = (products) => {
  if (!Array.isArray(products) || products.length === 0) return { min: 0, max: 0 }

  const prices = products
    .map(p => p.price)
    .filter(p => typeof p === 'number' && p > 0)

  if (prices.length === 0) return { min: 0, max: 0 }

  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  }
}

// Filtra productos por rango de precios
export const filterByPrice = (products, minPrice = 0, maxPrice = Infinity) => {
  if (!Array.isArray(products)) return []
  return products.filter(p => p.price >= minPrice && p.price <= maxPrice)
}

// Filtra solo productos con stock disponible
export const filterInStock = (products) => {
  if (!Array.isArray(products)) return []
  return products.filter(p => p.inStock === true)
}

// Aplica varios filtros: marca, precio y stock
export const applyFilters = (products, filters = {}) => {
  let result = [...products]

  if (filters.brand) result = filterByBrand(result, filters.brand)
  if (filters.priceMin !== undefined && filters.priceMin > 0)
    result = result.filter(p => p.price >= filters.priceMin)
  if (filters.priceMax !== undefined && filters.priceMax < Infinity)
    result = result.filter(p => p.price <= filters.priceMax)
  if (filters.inStock === true) result = filterInStock(result)

  return result
}

// Cuenta cuántos productos hay por marca
export const countByBrand = (products, brand) => {
  if (!Array.isArray(products) || brand === 'Todas') return products.length || 0
  return products.filter(p => p.brand === brand).length
}
