export const mockProducts = [
  {
    id: 1,
    brand: 'Nike',
    model: 'Air Max 270',
    category: 'Hombre',
    type: 'Tenis',
    description: 'Diseño revolucionario con amortiguación Air Max visible. Perfecto para uso diario y deportivo.',
    price: 3299,
    discount: 10,
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 46],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    ],
    inStock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: 2,
    brand: 'Adidas',
    model: 'Ultraboost 22',
    category: 'Hombre',
    type: 'Tenis',
    description: 'Tecnología Boost para máxima comodidad. Ideal para correr y actividades diarias.',
    price: 2899,
    discount: 15,
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    ],
    inStock: true,
    isNew: false,
    isFeatured: false
  },
  {
    id: 7,
    brand: 'Nike',
    model: 'Air Force 1',
    category: 'Mujer',
    type: 'Tenis',
    description: 'Clásico absoluto de Nike. Perfecto para combinar con cualquier outfit.',
    price: 2599,
    discount: 12,
    sizes: [33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop',
    ],
    inStock: true,
    isNew: false,
    isFeatured: true
  },
  {
    id: 8,
    brand: 'Adidas',
    model: 'Ultraboost 22',
    category: 'Mujer',
    type: 'Tenis',
    description: 'Máxima comodidad con estilo deportivo. Para entrenamientos y uso casual.',
    price: 3799,
    discount: 8,
    sizes: [33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop',
    ],
    inStock: true,
    isNew: true,
    isFeatured: true
  },
  {
    id: 13,
    brand: 'Nike',
    model: 'Swoosh Cap',
    category: 'Gorras',
    type: 'Gorra',
    description: 'Gorra clásica de Nike con diseño limpio. Perfecta para cualquier actividad.',
    price: 599,
    discount: 0,
    sizes: ['Única'],
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop',
    ],
    inStock: true,
    isNew: false,
    isFeatured: true
  },
  {
    id: 14,
    brand: 'Adidas',
    model: 'Classic Six Panel',
    category: 'Gorras',
    type: 'Gorra',
    description: 'Diseño seis paneles. Comodidad y estilo garantizados.',
    price: 499,
    discount: 15,
    sizes: ['Única'],
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop',
    ],
    inStock: true,
    isNew: false,
    isFeatured: false
  }
]

/**
 * Función para obtener productos por categoría
 * @param {string} category - Categoría a filtrar ('Hombre', 'Mujer', 'Gorras')
 * @returns {Array} Array de productos de la categoría
 */
export const getProductsByCategory = (category) => {
  return mockProducts.filter(product => product.category === category)
}

/**
 * Función para obtener un producto por ID
 * @param {number} id - ID del producto
 * @returns {Object} Objeto del producto
 */
export const getProductById = (id) => {
  return mockProducts.find(product => product.id === id)
}

/**
 * Función para obtener productos destacados
 * @returns {Array} Array de productos destacados
 */
export const getFeaturedProducts = () => {
  return mockProducts.filter(product => product.isFeatured).slice(0, 4)
}

/**
 * Función para obtener productos nuevos
 * @returns {Array} Array de productos nuevos
 */
export const getNewProducts = () => {
  return mockProducts.filter(product => product.isNew)
}

/**
 * Función para aplicar descuento
 * @param {number} price - Precio original
 * @param {number} discount - Porcentaje de descuento
 * @returns {number} Precio con descuento aplicado
 */
export const applyDiscount = (price, discount) => {
  return Math.round(price * (1 - discount / 100))
}

/**
 * Función para obtener precio con descuento
 * @param {Object} product - Objeto del producto
 * @returns {number} Precio final con descuento
 */
export const getPriceWithDiscount = (product) => {
  return applyDiscount(product.price, product.discount)
}

/**
 * Obtener categorías únicas
 * @returns {Array} Array de categorías únicas
 */
export const getCategories = () => {
  return [...new Set(mockProducts.map(product => product.category))]
}

/**
 * Obtener marcas únicas
 * @returns {Array} Array de marcas únicas
 */
export const getBrands = () => {
  return [...new Set(mockProducts.map(product => product.brand))]
}

/**
 * Búsqueda de productos
 * @param {string} query - Término de búsqueda
 * @returns {Array} Array de productos que coinciden
 */
export const searchProducts = (query) => {
  const lowerQuery = query.toLowerCase()
  return mockProducts.filter(product =>
    product.brand.toLowerCase().includes(lowerQuery) ||
    product.model.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery)
  )
}