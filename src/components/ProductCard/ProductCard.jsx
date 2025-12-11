import { Link } from 'react-router-dom'
import { formatPrice, getFinalPrice } from '../../utils/formatters'
import { getProductImage, getProductName } from '../../utils/imageUtils'

function ProductCard({ 
  product, 
  variant = 'default',
  showCategory = true
}) {
  const finalPrice = getFinalPrice(product)
  const productName = getProductName(product)
  const productImage = getProductImage(product)

  // Determinar clases según la variante
  const isFeatured = variant === 'featured'
  const isCompact = variant === 'compact'

  return (
    <Link to={`/product/${product.id}`} className="block h-full group no-underline">
      <article className={`
        relative bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300
        hover:-translate-y-2 hover:shadow-xl flex flex-col h-full
        ${isCompact ? 'flex-row' : ''}
      `}>
        
        {/* Badges (Descuento / Nuevo) */}
        {(product.discount > 0 || product.isNew) && (
          <div className={`
            absolute z-10 flex flex-col gap-1
            ${isCompact ? 'top-2 right-2 flex-row' : 'top-4 right-4'}
          `}>
            {product.discount > 0 && (
              <span className={`
                inline-flex items-center justify-center rounded-full font-bold uppercase tracking-wide bg-error text-white shadow-sm
                ${isCompact ? 'text-[9px] px-1.5 py-0.5' : 'text-xs px-3 py-1'}
              `}>
                -{product.discount}%
              </span>
            )}
            {product.isNew && (
              <span className={`
                inline-flex items-center justify-center rounded-full font-bold uppercase tracking-wide bg-accent text-white shadow-sm
                ${isCompact ? 'text-[9px] px-1.5 py-0.5' : 'text-xs px-3 py-1'}
              `}>
                NUEVO
              </span>
            )}
          </div>
        )}

        {/* Contenedor de Imagen */}
        <div className={`
          relative overflow-hidden bg-light shrink-0
          ${isFeatured ? 'h-[320px]' : ''}
          ${isCompact ? 'w-[120px] h-[120px]' : 'w-full h-[280px]'}
        `}>
          <img
            src={productImage}
            alt={productName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Información del Producto */}
        <div className={`
          flex flex-col flex-1
          ${isFeatured ? 'p-8 gap-4' : 'p-6 gap-3'}
          ${isCompact ? 'p-4' : ''}
        `}>
          {showCategory && product.category && (
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              {product.category}
            </span>
          )}

          <div className="flex justify-between items-start gap-2">
            <h3 className={`
              font-title font-bold text-primary m-0 leading-tight flex flex-col gap-1 flex-1
              ${isFeatured ? 'text-xl' : 'text-lg'}
              ${isCompact ? 'text-base' : ''}
            `}>
              {product.brand && (
                <span className="text-primary">{product.brand}</span>
              )}
              {product.model && (
                <span className="font-semibold text-dark-gray text-base">
                  {product.model}
                </span>
              )}
              {!product.brand && !product.model && product.name}
            </h3>
          </div>

          {/* Descripción solo en Featured */}
          {isFeatured && product.description && (
            <p className="text-sm text-gray-600 leading-relaxed m-0 line-clamp-2">
              {product.description}
            </p>
          )}

          <div className="flex items-center gap-3 flex-wrap mt-auto">
            {product.discount > 0 ? (
              <>
                <span className="text-base text-gray-600 line-through font-normal">
                  {formatPrice(product.price)}
                </span>
                <span className={`font-bold text-accent ${isCompact ? 'text-base' : 'text-xl'}`}>
                  {formatPrice(finalPrice)}
                </span>
              </>
            ) : (
              <span className={`font-bold text-accent ${isCompact ? 'text-base' : 'text-xl'}`}>
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

export default ProductCard