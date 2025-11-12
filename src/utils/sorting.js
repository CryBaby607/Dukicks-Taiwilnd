// Estrategias de ordenamiento disponibles
export const SORT_STRATEGIES = {
  'price-low': (a, b) => a.price - b.price,
  'price-high': (a, b) => b.price - a.price,
  'newest': (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0),
  'discount': (a, b) => (b.discount || 0) - (a.discount || 0),
  'name-asc': (a, b) => a.model.localeCompare(b.model),
  'name-desc': (a, b) => b.model.localeCompare(a.model)
}

// Ordena productos según la estrategia indicada
export const sortProducts = (products, sortBy = 'newest') => {
  if (!Array.isArray(products) || products.length === 0) return products

  const strategy = SORT_STRATEGIES[sortBy]
  if (!strategy) {
    console.warn(`Estrategia de ordenamiento desconocida: "${sortBy}"`)
    return products
  }

  return [...products].sort(strategy)
}

// Opciones de ordenamiento para mostrar en select
export const getSortOptions = () => [
  { value: 'newest', label: 'Más Nuevos' },
  { value: 'price-low', label: 'Precio: Menor a Mayor' },
  { value: 'price-high', label: 'Precio: Mayor a Menor' },
  { value: 'discount', label: 'Mayor Descuento' },
  { value: 'name-asc', label: 'Nombre (A-Z)' },
  { value: 'name-desc', label: 'Nombre (Z-A)' }
]

// Verifica si una estrategia existe
export const isSortStrategyValid = (sortBy) => sortBy in SORT_STRATEGIES

// Devuelve la etiqueta legible de una estrategia
export const getSortLabel = (sortBy) => {
  const option = getSortOptions().find(opt => opt.value === sortBy)
  return option ? option.label : 'Ordenamiento desconocido'
}
