import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../../context/CartContext'
import { getProductById } from '../../services/product'
import { formatPrice, getFinalPrice, calculateSavings } from '../../utils/formatters'
import { getProductImages, getProductName } from '../../utils/imageUtils'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await getProductById(id)
        if (!productData) {
          navigate('/', { replace: true })
          return
        }
        setProduct(productData)
      } catch (err) {
        navigate('/', { replace: true })
      }
    }
    loadProduct()
  }, [id, navigate])

  if (!product) return null

  const images = getProductImages(product)
  const finalPrice = getFinalPrice(product)
  const savings = calculateSavings(product.price, product.discount)
  const productName = getProductName(product)

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
    <div className="min-h-screen py-12 bg-light">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-6 lg:p-12 rounded-2xl shadow-xl">

          {/* Galería */}
          <div className="flex flex-col gap-6">
            <div className="relative w-full h-[400px] lg:h-[600px] rounded-2xl overflow-hidden bg-light group">
              {product.discount > 0 && (
                <span className="absolute top-6 right-6 px-3 py-1 bg-error text-white font-bold text-sm rounded-full z-10 uppercase tracking-wide shadow-sm">
                  -{product.discount}%
                </span>
              )}
              {product.isNew && (
                <span className={`absolute right-6 px-3 py-1 bg-accent text-white font-bold text-sm rounded-full z-10 uppercase tracking-wide shadow-sm ${product.discount > 0 ? 'top-16' : 'top-6'}`}>
                  NUEVO
                </span>
              )}
              <img
                src={images[selectedImage]}
                alt={productName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`
                      shrink-0 w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] rounded-lg overflow-hidden border-2 cursor-pointer transition-all p-0
                      ${selectedImage === i ? 'border-accent shadow-md scale-95' : 'border-transparent hover:border-gray-300'}
                    `}
                    onClick={() => setSelectedImage(i)}
                  >
                    <img src={img} alt={`Vista ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información */}
          <div className="flex flex-col gap-8">
            <div>
              <span className="inline-block text-sm font-bold text-accent uppercase tracking-widest mb-2">
                {product.category}
              </span>
              <h1 className="flex flex-col gap-1 m-0 leading-tight">
                <span className="font-title text-4xl lg:text-5xl font-bold text-primary">
                  {product.brand}
                </span>
                <span className="font-title text-2xl lg:text-3xl font-semibold text-dark-gray">
                  {product.model || productName}
                </span>
              </h1>
            </div>

            <div className="flex items-center gap-4 flex-wrap py-6 border-t border-b border-light">
              {product.discount > 0 ? (
                <>
                  <span className="text-xl text-gray-600 line-through decoration-1">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-4xl font-bold text-accent">
                    {formatPrice(finalPrice)}
                  </span>
                  <span className="px-3 py-1 bg-success/10 text-success text-sm font-bold rounded-full border border-success/20">
                    Ahorras {formatPrice(savings)}
                  </span>
                </>
              ) : (
                <span className="text-4xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {product.description && (
              <div className="flex flex-col gap-3">
                <h3 className="font-title text-xl font-bold text-primary m-0">Descripción</h3>
                <p className="text-base text-dark-gray leading-relaxed m-0">
                  {product.description}
                </p>
              </div>
            )}

            {product.sizes?.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="font-title text-lg font-bold text-primary m-0">Selecciona tu talla</h3>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(60px,1fr))] gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`
                        py-3 border-2 rounded-lg font-semibold transition-all
                        ${selectedSize === size 
                          ? 'border-accent bg-accent text-white shadow-md' 
                          : 'border-light bg-white text-primary hover:border-accent hover:bg-light'}
                      `}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <h3 className="font-title text-lg font-bold text-primary m-0">Cantidad</h3>
              <div className="flex items-center gap-2">
                <button
                  className="w-10 h-10 border-2 border-gray-200 bg-white text-primary font-bold rounded-lg hover:border-primary hover:bg-primary hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-primary transition-all"
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
                  className="w-16 h-10 text-center border-2 border-gray-200 bg-light text-primary font-bold rounded-lg focus:outline-none focus:border-accent"
                />

                <button
                  className="w-10 h-10 border-2 border-gray-200 bg-white text-primary font-bold rounded-lg hover:border-primary hover:bg-primary hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-primary transition-all"
                  onClick={() => changeQuantity(quantity + 1)}
                  disabled={quantity >= 99}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                className="flex-2 btn btn-primary text-lg py-4 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                onClick={handleAddToCart}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                <span>Agregar al Carrito</span>
              </button>

              <Link 
                to="/cart" 
                className="flex-1 btn btn-secondary text-lg py-4 text-center hover:bg-primary hover:text-white transition-colors"
              >
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