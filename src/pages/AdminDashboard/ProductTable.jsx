import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrash, faBoxOpen, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { formatPrice } from '../../../utils/formatters'
import { getProductImage } from '../../../utils/imageUtils'

function ProductTable({ products, loading, onEdit, onDelete, onAdd }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-6 p-6 border-b border-light bg-white">
        <h2 className="font-title text-3xl font-bold text-primary tracking-tight m-0">
          Inventario
        </h2>
        <button 
          onClick={onAdd} 
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-secondary text-white border-none rounded-md text-base font-bold cursor-pointer transition-transform shadow-lg hover:-translate-y-0.5 active:translate-y-0"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Agregar Producto</span>
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-16 text-gray">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" className="mb-4 text-accent" />
          <p>Cargando productos...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center p-16">
          <FontAwesomeIcon icon={faBoxOpen} size="3x" className="text-gray-300 mb-4" />
          <h3 className="font-title text-2xl font-bold text-primary mb-2">No hay productos</h3>
          <p className="text-gray mb-6">Comienza agregando tu primer producto</p>
          <button onClick={onAdd} className="btn btn-primary">
            Agregar Primer Producto
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-primary text-white">
                <th className="p-4 text-left font-bold uppercase text-xs tracking-wider">Imagen</th>
                <th className="p-4 text-left font-bold uppercase text-xs tracking-wider">Info</th>
                <th className="p-4 text-left font-bold uppercase text-xs tracking-wider">Categoría</th>
                <th className="p-4 text-left font-bold uppercase text-xs tracking-wider">Precio</th>
                <th className="p-4 text-left font-bold uppercase text-xs tracking-wider">Tallas</th>
                <th className="p-4 text-left font-bold uppercase text-xs tracking-wider">Estado</th>
                <th className="p-4 text-left font-bold uppercase text-xs tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b border-light hover:bg-gray-50 transition-colors">
                  <td className="p-4 w-24">
                    <img 
                      src={getProductImage(product) || 'https://via.placeholder.com/100'}
                      alt={product.model}
                      className="w-16 h-16 object-cover rounded-md shadow-sm"
                      loading="lazy"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-primary">{product.brand}</span>
                      <span className="text-sm text-dark-gray">{product.model}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray font-medium">{product.category}</td>
                  <td className="p-4 font-bold text-accent">
                    {formatPrice(product.price)}
                    {product.discount > 0 && (
                      <span className="block text-xs text-error font-normal">-{product.discount}% OFF</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {product.sizes && product.sizes.length > 0 ? (
                        <>
                          {product.sizes.slice(0, 3).map((size, idx) => (
                            <span key={idx} className="inline-flex px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-600">
                              {size}
                            </span>
                          ))}
                          {product.sizes.length > 3 && (
                            <span className="inline-flex px-1.5 py-0.5 bg-gray-100 rounded text-[10px] text-gray-500">
                              +{product.sizes.length - 3}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Sin tallas</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      {product.isNew && (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-accent text-white w-fit">
                          NUEVO
                        </span>
                      )}
                      {product.isFeatured && (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-warning text-white w-fit">
                          DESTACADO
                        </span>
                      )}
                      {!product.isNew && !product.isFeatured && (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => onEdit(product)}
                        className="w-8 h-8 flex items-center justify-center rounded border border-accent text-accent hover:bg-accent hover:text-white transition-all"
                        title="Editar"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button 
                        onClick={() => onDelete(product.id)}
                        className="w-8 h-8 flex items-center justify-center rounded border border-error text-error hover:bg-error hover:text-white transition-all"
                        title="Eliminar"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ProductTable