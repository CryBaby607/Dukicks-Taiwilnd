export const getUniqueBrands = (products, includeAll = true) => {
  if (!Array.isArray(products)) return includeAll ? ['Todas'] : []

  const brands = [...new Set(products.map(p => p?.brand).filter(Boolean))].sort()
  return includeAll ? ['Todas', ...brands] : brands
}

export const filterByBrand = (products, brands) => {
  if (!Array.isArray(products)) return []

  if (!brands || brands === 'Todas' ||
      (Array.isArray(brands) && brands.includes('Todas'))) {
    return products
  }

  const brandArray = Array.isArray(brands) ? brands : [brands]
  return products.filter(p => brandArray.includes(p.brand))
}

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

export const filterByPrice = (products, minPrice = 0, maxPrice = Infinity) => {
  if (!Array.isArray(products)) return []
  return products.filter(p => p.price >= minPrice && p.price <= maxPrice)
}

export const applyFilters = (products, filters = {}) => {
  let result = [...products]

  if (filters.brand) result = filterByBrand(result, filters.brand)
  if (filters.priceMin !== undefined && filters.priceMin > 0)
    result = result.filter(p => p.price >= filters.priceMin)
  if (filters.priceMax !== undefined && filters.priceMax < Infinity)
    result = result.filter(p => p.price <= filters.priceMax)

  return result
}