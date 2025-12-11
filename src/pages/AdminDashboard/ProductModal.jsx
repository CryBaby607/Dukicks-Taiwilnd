import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSpinner, faImage, faX } from '@fortawesome/free-solid-svg-icons'
import { SIZES, PRODUCT_CATEGORIES } from '../../constants/product'

function ProductModal({ 
  isOpen, 
  onClose, 
  isEditing, 
  saving, 
  formData, 
  formErrors, 
  imagePreview, 
  onInputChange, 
  onImageChange, 
  onRemoveImage, 
  onSizeToggle, 
  onSubmit 
}) {
  if (!isOpen) return null

  const availableSizes = SIZES[formData.category] || []

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-modal p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-in" onClick={e => e.stopPropagation()}>
        
        <div className="flex items-center justify-between p-6 border-b border-light bg-gray-50 sticky top-0 z-10">
          <h2 className="font-title text-xl font-bold text-primary m-0">
            {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button 
            onClick={onClose} 
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 hover:text-error transition-colors text-gray-600"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <form onSubmit={onSubmit} noValidate className="p-6 flex flex-col gap-6">
          
          {/* Imagen */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-primary uppercase tracking-wide">Imagen *</label>
            <div className="border-2 border-dashed border-accent/30 rounded-lg p-6 flex flex-col items-center justify-center bg-accent/5 hover:bg-accent/10 transition-colors relative group">
              {imagePreview ? (
                <div className="relative w-full aspect-square max-w-[200px] rounded-lg overflow-hidden border border-light">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={onRemoveImage}
                    className="absolute top-2 right-2 w-8 h-8 bg-error text-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                  >
                    <FontAwesomeIcon icon={faX} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center cursor-pointer w-full h-full">
                  <FontAwesomeIcon icon={faImage} className="text-4xl text-accent mb-2" />
                  <span className="font-semibold text-primary">Subir Imagen</span>
                  <small className="text-gray-600">Click o arrastra aquí</small>
                  <input type="file" accept="image/*" onChange={onImageChange} className="hidden" />
                </label>
              )}
            </div>
            {formErrors.image && <span className="text-xs text-error font-bold">{formErrors.image}</span>}
          </div>

          {/* Campos de Texto Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-primary uppercase">Marca *</label>
              <input
                type="text"
                name="brand"
                className="w-full p-3 border border-gray-300 rounded-md focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                placeholder="Nike"
                value={formData.brand}
                onChange={onInputChange}
              />
              {formErrors.brand && <span className="text-xs text-error font-bold">{formErrors.brand}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-primary uppercase">Modelo *</label>
              <input
                type="text"
                name="model"
                className="w-full p-3 border border-gray-300 rounded-md focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                placeholder="Air Force 1"
                value={formData.model}
                onChange={onInputChange}
              />
              {formErrors.model && <span className="text-xs text-error font-bold">{formErrors.model}</span>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-primary uppercase">Categoría</label>
              <select
                name="category"
                className="w-full p-3 border border-gray-300 rounded-md focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-white"
                value={formData.category}
                onChange={onInputChange}
              >
                <option value={PRODUCT_CATEGORIES.HOMBRE}>Hombre</option>
                <option value={PRODUCT_CATEGORIES.MUJER}>Mujer</option>
                <option value={PRODUCT_CATEGORIES.GORRAS}>Gorras</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-primary uppercase">Precio *</label>
              <input
                type="number"
                name="price"
                className="w-full p-3 border border-gray-300 rounded-md focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                placeholder="0.00"
                value={formData.price}
                onChange={onInputChange}
                min="0"
              />
              {formErrors.price && <span className="text-xs text-error font-bold">{formErrors.price}</span>}
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-primary uppercase">Descuento (%)</label>
            <input
              type="number"
              name="discount"
              className="w-full p-3 border border-gray-300 rounded-md focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
              value={formData.discount}
              onChange={onInputChange}
              min="0"
              max="100"
            />
          </div>

          {/* Tallas */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-primary uppercase">Tallas *</label>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => onSizeToggle(size)}
                  className={`
                    min-w-[40px] px-3 py-2 border rounded-md font-semibold text-sm transition-all
                    ${formData.sizes.includes(size) 
                      ? 'bg-accent border-accent text-white shadow-sm' 
                      : 'bg-white border-gray-200 text-primary hover:bg-gray-50 hover:border-gray-300'}
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                  disabled={formData.category === PRODUCT_CATEGORIES.GORRAS}
                >
                  {size}
                </button>
              ))}
            </div>
            {formErrors.sizes && <span className="text-xs text-error font-bold">{formErrors.sizes}</span>}
          </div>

          {/* Descripción */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-primary uppercase">Descripción *</label>
            <textarea
              name="description"
              className="w-full p-3 border border-gray-300 rounded-md focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-y min-h-[100px]"
              value={formData.description}
              onChange={onInputChange}
              rows="4"
            />
            {formErrors.description && <span className="text-xs text-error font-bold">{formErrors.description}</span>}
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                name="isNew"
                checked={formData.isNew}
                onChange={onInputChange}
                className="w-4 h-4 accent-accent cursor-pointer"
              />
              <span className="text-sm font-semibold text-primary">Marcar NUEVO</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={onInputChange}
                className="w-4 h-4 accent-accent cursor-pointer"
              />
              <span className="text-sm font-semibold text-primary">Marcar DESTACADO</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t border-light mt-2">
            <button 
              type="button"
              onClick={onClose} 
              className="flex-1 py-3 px-4 bg-gray-100 text-primary font-bold rounded-md hover:bg-gray-200 transition-colors"
              disabled={saving}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3 px-4 bg-gradient-to-r from-accent to-secondary text-white font-bold rounded-md shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={saving}
            >
              {saving ? (
                <span className="flex items-center justify-center gap-2">
                  <FontAwesomeIcon icon={faSpinner} spin />
                  Guardando...
                </span>
              ) : (
                isEditing ? 'Guardar Cambios' : 'Crear Producto'
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default ProductModal