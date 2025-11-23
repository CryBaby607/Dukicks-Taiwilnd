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

export const getProductImage = (product) => {
  const images = getProductImages(product)
  return images[0] || null
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