export const searchProducts = (products, query) => {
  if (!Array.isArray(products) || !query?.trim()) return products

  const normalizedQuery = query.toLowerCase().trim()

  return products.filter(p => {
    const fields = [
      p.brand || '',
      p.model || '',
      p.name || '',
      p.description || '',
      p.category || '',
      p.type || ''
    ]
    return fields.some(f => String(f).toLowerCase().includes(normalizedQuery))
  })
}

export const searchProductsWithRelevance = (products, query) => {
  if (!Array.isArray(products) || !query?.trim()) return products

  const normalizedQuery = query.toLowerCase().trim()
  const queryWords = normalizedQuery.split(/\s+/)

  return products
    .map(p => {
      let score = 0
      const fields = [
        { value: (p.brand || '').toLowerCase(), weight: 10 },
        { value: (p.model || '').toLowerCase(), weight: 10 },
        { value: (p.name || '').toLowerCase(), weight: 8 },
        { value: (p.category || '').toLowerCase(), weight: 6 },
        { value: (p.description || '').toLowerCase(), weight: 3 },
        { value: (p.type || '').toLowerCase(), weight: 3 }
      ]

      fields.forEach(f => {
        if (f.value === normalizedQuery) score += f.weight * 5
        if (f.value.startsWith(normalizedQuery)) score += f.weight * 3
        if (f.value.includes(normalizedQuery)) score += f.weight * 2
        queryWords.forEach(w => {
          if (f.value.includes(w)) score += f.weight * 0.5
        })
      })

      return { ...p, relevanceScore: score }
    })
    .filter(p => p.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .map(({ relevanceScore, ...p }) => p)
}

export const getSearchSuggestions = (products, query, limit = 5) => {
  if (!Array.isArray(products) || !query?.trim() || query.trim().length < 2) return []

  const normalizedQuery = query.toLowerCase().trim()
  const suggestions = new Set()

  products.forEach(p => {
    ;[p.brand, p.model, p.category].forEach(f => {
      if (f && String(f).toLowerCase().includes(normalizedQuery)) suggestions.add(String(f))
    })
  })

  return Array.from(suggestions).slice(0, limit)
}

export const searchWithFilters = (products, searchQuery, filters = {}) => {
  let results = searchProductsWithRelevance(products, searchQuery)

  if (filters.brand && filters.brand !== 'Todas') results = results.filter(p => p.brand === filters.brand)
  if (filters.minPrice) results = results.filter(p => p.price >= filters.minPrice)
  if (filters.maxPrice) results = results.filter(p => p.price <= filters.maxPrice)
  if (filters.inStock) results = results.filter(p => p.inStock)
  if (filters.hasDiscount) results = results.filter(p => p.discount > 0)

  return results
}
