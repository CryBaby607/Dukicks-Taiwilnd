import { PRODUCT_CATEGORIES } from '../constants/product'

export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const validateImageFile = (file) => {
  if (!file) return 'No se ha seleccionado ningún archivo.';
  if (!file.type.startsWith('image/')) {
    return 'Solo se permiten archivos de imagen';
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `La imagen no debe superar ${MAX_FILE_SIZE_MB}MB`;
  }
  return null;
};

export const validateProductData = (data) => {
  const errors = {}

  const textFields = ['brand', 'model', 'description']
  textFields.forEach(field => {
    if (!data[field] || !data[field].toString().trim()) {
      errors[field] = `El campo ${field} es obligatorio`
    }
  })

  if (!data.price || isNaN(data.price) || Number(data.price) <= 0) {
    errors.price = 'El precio debe ser un número mayor a 0'
  }

  if (data.discount !== '' && (isNaN(data.discount) || Number(data.discount) < 0 || Number(data.discount) > 100)) {
    errors.discount = 'El descuento debe estar entre 0 y 100'
  }

  if (!Object.values(PRODUCT_CATEGORIES).includes(data.category)) {
    errors.category = 'Categoría inválida'
  }

  if (data.category !== PRODUCT_CATEGORIES.GORRAS) {
    if (!Array.isArray(data.sizes) || data.sizes.length === 0) {
      errors.sizes = 'Debes seleccionar al menos una talla'
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}