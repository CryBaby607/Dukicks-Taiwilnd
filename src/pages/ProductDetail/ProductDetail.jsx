import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../../context/CartContext'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { formatPrice, getFinalPrice, calculateSavings } from '../../utils/formatters'
import { getProductImages, getProductName } from '../../utils/imageUtils' // ✅ NUEVO IMPORT
import './ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  // Cargar producto
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const ref = doc(db, 'products', id)
        const snap = await getDoc(ref)

        if (!snap.exists()) {
          navigate('/', { replace: true })
          return
        }

        setProduct({ id: snap.id, ...snap.data() })
      } catch (err) {
        console.error('Error al cargar:', err)
        navigate('/', { replace: true })
      }
    }

    loadProduct()
  }, [id, navigate])

  // No renderizar nada si aún no hay producto
  if (!product) return null

  const images = getProductImages(product) // ✅ USAR UTILIDAD
  const finalPrice = getFinalPrice(product)
  const savings = calculateSavings(product.price, product.discount)
  const productName = getProductName(product) // ✅ USAR UTILIDAD

  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      alert('Selecciona una talla')
      return
    }

    addToCart({
      id: product.id,
      name: productName,
      price: finalPrice,
      image: images[0] || 'https://via.placeholder.com/300',
      category: product.category,
      size: selectedSize,
      quantity
    })
  }

  const changeQuantity = n => {
    if (n >= 1 && n <= 99) setQuantity(n)
  }

  return (
    <div className="product-detail">
      <div className="container">
        <div className="detail-wrapper">

          {/* Galería */}
          <div className="detail-gallery">
            <div className="gallery-main">
              {product.discount > 0 && (
                <span className="detail-badge detail-badge--discount">
                  -{product.discount}%
                </span>
              )}
              {product.isNew && (
                <span className="detail-badge detail-badge--new">NUEVO</span>
              )}
              <img
                src={images[selectedImage]}
                alt={productName}
                className="gallery-main-image"
              />
            </div>

            {images.length > 1 && (
              <div className="gallery-thumbnails">
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`thumbnail ${selectedImage === i ? 'active' : ''}`}
                    onClick={() => setSelectedImage(i)}
                  >
                    <img src={img} alt={`Imagen ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="detail-info">

            <span className="detail-category">{product.category}</span>

            <h1 className="detail-title">{productName}</h1>

            <div className="detail-prices">
              {product.discount > 0 ? (
                <>
                  <span className="detail-price detail-price--original">
                    {formatPrice(product.price)}
                  </span>
                  <span className="detail-price detail-price--final">
                    {formatPrice(finalPrice)}
                  </span>
                  <span className="detail-savings">
                    Ahorras {formatPrice(savings)}
                  </span>
                </>
              ) : (
                <span className="detail-price detail-price--final">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {product.description && (
              <div className="detail-description">
                <h3>Descripción</h3>
                <p>{product.description}</p>
              </div>
            )}

            {product.sizes?.length > 0 && (
              <div className="detail-sizes">
                <h3>Selecciona tu talla</h3>
                <div className="sizes-grid">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="detail-quantity">
              <h3>Cantidad</h3>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => changeQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>

                <input
                  type="number"
                  min="1"
                  max="99"
                  value={quantity}
                  onChange={e => changeQuantity(parseInt(e.target.value) || 1)}
                  className="quantity-input"
                />

                <button
                  className="quantity-btn"
                  onClick={() => changeQuantity(quantity + 1)}
                  disabled={quantity >= 99}
                >
                  +
                </button>
              </div>
            </div>

            <div className="detail-actions">
              <button
                className="btn btn-primary btn-add-cart"
                onClick={handleAddToCart}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                <span>Agregar al Carrito</span>
              </button>

              <Link to="/cart" className="btn btn-secondary">
                Ver Carrito
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail