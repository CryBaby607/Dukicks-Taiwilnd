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

export const requiredFieldMessages = {
  brand: 'La marca es requerida',
  model: 'El modelo es requerido',
  description: 'La descripción es requerida',
  price: 'El precio es requerido'
}

export const validateRequired = (data, fields) => {
  const errors = {}
  fields.forEach(field => {
    if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
      errors[field] = requiredFieldMessages[field] || `El campo ${field} es requerido`
    }
  })
  return errors
}