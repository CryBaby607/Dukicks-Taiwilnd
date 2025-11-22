export const SORT_STRATEGIES = {
  'price-low': (a, b) => a.price - b.price,
  'price-high': (a, b) => b.price - a.price,
  'name-asc': (a, b) => a.model.localeCompare(b.model),
  'name-desc': (a, b) => b.model.localeCompare(a.model)
}

export const sortProducts = (products, sortBy = 'price-low') => { 
  if (!Array.isArray(products) || products.length === 0) return products

  const strategy = SORT_STRATEGIES[sortBy]
  if (!strategy) {
    console.warn(`Estrategia de ordenamiento desconocida: "${sortBy}"`)
    return products
  }

  return [...products].sort(strategy)
}

export const getSortOptions = () => [
  { value: 'price-low', label: 'Precio: Menor a Mayor' },
  { value: 'price-high', label: 'Precio: Mayor a Menor' },
  { value: 'name-asc', label: 'Nombre (A-Z)' },
  { value: 'name-desc', label: 'Nombre (Z-A)' }
]