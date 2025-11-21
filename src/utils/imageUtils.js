export const getProductImage = (product) => {
  if (!product || typeof product !== 'object') {
    console.warn('getProductImage: product inválido', product)
    return null
  }
  
  if (Array.isArray(product.images) && product.images.length > 0) {
    return product.images[0]
  }
  
  return product.image || null
}

export const getProductImages = (product) => {
  if (!product || typeof product !== 'object') {
    console.warn('getProductImages: product inválido', product)
    return []
  }
  
  if (Array.isArray(product.images) && product.images.length > 0) {
    return product.images
  }
  
  if (product.image) {
    return [product.image]
  }
  
  return []
}

export const getProductImageWithFallback = (product, fallback = 'https://via.placeholder.com/300') => {
  return getProductImage(product) || fallback
}

export const getProductName = (product) => {
  if (!product || typeof product !== 'object') {
    console.warn('getProductName: product inválido', product)
    return ''
  }
  
  if (product.brand && product.model) {
    return `${product.brand} ${product.model}`
  }
  
  return product.name || ''
}