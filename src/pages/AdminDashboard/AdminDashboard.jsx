import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { 
  getAllProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../../services/product'
import { getProductImage } from '../../utils/imageUtils'
import { PRODUCT_CATEGORIES } from '../../constants/product' 
import { validateImageFile, validateProductData } from '../../helpers/validation' 
import { useErrorHandler } from '../../hooks/useErrorHandler'

import AdminHeader from './AdminHeader'
import StatsCards from './StatsCards'
import ProductTable from './ProductTable'
import ProductModal from './ProductModal'

function AdminDashboard() {
  const { error: globalError, handleError, clearError } = useErrorHandler()
  
  const [products, setProducts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})
  const [imagePreview, setImagePreview] = useState(null)
  
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    category: PRODUCT_CATEGORIES.HOMBRE,
    price: '',
    discount: '0',
    description: '',
    imageFile: null,
    isNew: false,
    isFeatured: false,
    sizes: []
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const allProducts = await getAllProducts()
      setProducts(allProducts)
    } catch (error) {
      handleError(error, 'Cargando Productos')
    } finally {
      setLoading(false)
    }
  }

  const openAddModal = () => {
    setEditingProduct(null)
    resetForm()
    setIsModalOpen(true)
  }

  const openEditModal = (product) => {
    setEditingProduct(product)
    setFormData({
      brand: product.brand,
      model: product.model,
      category: product.category,
      price: product.price.toString(),
      discount: (product.discount || 0).toString(),
      description: product.description,
      imageFile: null,
      isNew: product.isNew || false,
      isFeatured: product.isFeatured || false,
      sizes: Array.isArray(product.sizes) ? product.sizes : []
    })
    setImagePreview(getProductImage(product))
    setErrors({})
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      brand: '',
      model: '',
      category: PRODUCT_CATEGORIES.HOMBRE,
      price: '',
      discount: '0',
      description: '',
      imageFile: null,
      isNew: false,
      isFeatured: false,
      sizes: []
    })
    setImagePreview(null)
    setErrors({})
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData(prev => {
      let updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }

      if (name === "category") {
        if (value === PRODUCT_CATEGORIES.GORRAS) {
          updated.sizes = ['Única']
        } else if (prev.category === PRODUCT_CATEGORIES.GORRAS && value !== PRODUCT_CATEGORIES.GORRAS) {
          updated.sizes = []
        }
      }

      return updated
    })

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validationError = validateImageFile(file)
    if (validationError) {
      setErrors(prev => ({ ...prev, image: validationError }))
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      setImagePreview(event.target.result)
      setFormData(prev => ({ ...prev, imageFile: file }))
      setErrors(prev => ({ ...prev, image: '' }))
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImagePreview(null)
    setFormData(prev => ({ ...prev, imageFile: null }))
  }

  const handleSizeToggle = (size) => {
    setFormData(prev => {
      const isSelected = prev.sizes.includes(size)
      return {
        ...prev,
        sizes: isSelected ? prev.sizes.filter(s => s !== size) : [...prev.sizes, size]
      }
    })
    if (errors.sizes) setErrors(prev => ({ ...prev, sizes: '' }))
  }

  const validateForm = () => {
    const { isValid, errors: dataErrors } = validateProductData(formData)
    let newErrors = { ...dataErrors }

    if (!editingProduct && !formData.imageFile) {
      newErrors.image = 'Debes subir una imagen'
    }
    if (editingProduct && !formData.imageFile && !imagePreview) {
      newErrors.image = 'Debes mantener o cargar una imagen'
    }

    setErrors(newErrors)
    return isValid && !newErrors.image
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setSaving(true)

    try {
      const price = parseFloat(formData.price)
      const discount = formData.discount ? parseFloat(formData.discount) : 0

      const productData = {
        brand: formData.brand.trim(),
        model: formData.model.trim(),
        category: formData.category,
        price: price,
        discount: discount,
        description: formData.description.trim(),
        isNew: formData.isNew,
        isFeatured: formData.isFeatured,
        sizes: formData.sizes,
        type: 'Tenis'
      }

      if (formData.imageFile) {
        productData.imageFile = formData.imageFile
      } else if (editingProduct && imagePreview) {
        productData.image = imagePreview
      }

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData)
      } else {
        await createProduct(productData)
      }

      await loadProducts()
      closeModal()
    } catch (error) {
      handleError(error, 'Guardando Producto')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await deleteProduct(id)
        await loadProducts()
      } catch (error) {
        handleError(error, 'Eliminando Producto')
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-light">
      
      {/* Notificación de Error Global */}
      {globalError && (
        <div className="fixed top-0 left-0 right-0 bg-red-100 text-error p-4 text-center z-[2000] flex justify-center items-center shadow-md">
          <span>{globalError}</span>
          <button onClick={clearError} className="ml-4 bg-transparent border-none cursor-pointer text-lg text-error">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}

      {/* Header Independiente */}
      <AdminHeader />

      {/* Contenido Principal */}
      <div className="flex-1 py-12">
        <div className="container mx-auto px-4">
          
          <StatsCards products={products} />

          <ProductTable 
            products={products}
            loading={loading}
            onEdit={openEditModal}
            onDelete={handleDelete}
            onAdd={openAddModal}
          />
        </div>
      </div>

      {/* Modal de Producto */}
      <ProductModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        isEditing={!!editingProduct}
        saving={saving}
        formData={formData}
        formErrors={errors}
        imagePreview={imagePreview}
        onInputChange={handleInputChange}
        onImageChange={handleImageChange}
        onRemoveImage={removeImage}
        onSizeToggle={handleSizeToggle}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default AdminDashboard