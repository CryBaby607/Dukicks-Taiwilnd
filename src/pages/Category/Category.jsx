import { useState, useMemo } from 'react'
import { getProductsByCategory } from '../../data/Products'
import { sortProducts, getSortOptions } from '../../utils/sorting'
import { getUniqueBrands, applyFilters } from '../../utils/filters'
import ProductCard from '../../components/ProductCard/ProductCard'
import './Category.css'

function CategoryPage({ category }) {
  const [selectedBrand, setSelectedBrand] = useState('Todas')
  const [sortBy, setSortBy] = useState('newest')

  // Obtener todos los productos de la categoría (memoizado)
  const allProducts = useMemo(
    () => getProductsByCategory(category),
    [category]
  )

  // Obtener marcas únicas (memoizado)
  const brandsInCategory = useMemo(
    () => getUniqueBrands(allProducts, true),
    [allProducts]
  )

  // Aplicar filtros (memoizado)
  const filteredProducts = useMemo(() => {
    return applyFilters(allProducts, { brand: selectedBrand })
  }, [allProducts, selectedBrand])

  // Aplicar ordenamiento (memoizado)
  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts, sortBy)
  }, [filteredProducts, sortBy])

  return (
    <div className="category-page">
      <div className="container">
        <div className="category-wrapper">
          
          {/* ===== SIDEBAR: FILTROS ===== */}
          <aside className="category-sidebar">
            
            {/* Filtro de Marca */}
            <div className="filter-section">
              <h3 className="filter-title">Marcas</h3>
              <div className="filter-brands">
                {brandsInCategory.map(brand => (
                  <button
                    key={brand}
                    className={`brand-btn ${selectedBrand === brand ? 'active' : ''}`}
                    onClick={() => setSelectedBrand(brand)}
                    aria-pressed={selectedBrand === brand}
                  >
                    {brand}
                    <span className="brand-count">
                      ({brand === 'Todas'
                        ? allProducts.length
                        : allProducts.filter(p => p.brand === brand).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ordenamiento */}
            <div className="filter-section">
              <h3 className="filter-title">Ordenar Por</h3>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Ordenar productos"
              >
                {getSortOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </aside>

          {/* ===== CONTENIDO PRINCIPAL ===== */}
          <section className="category-content">
            
            {/* Info de productos */}
            <div className="products-info">
              <p className="products-count">
                Mostrando {sortedProducts.length} de {allProducts.length} productos
              </p>
            </div>

            {/* ===== GRID DE PRODUCTOS ===== */}
            <div className="category-products-grid">
              {sortedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant="default"
                  showCategory={false}
                />
              ))}
            </div>

            {/* Mensaje si no hay productos */}
            {sortedProducts.length === 0 && (
              <div className="no-products">
                <p>No hay productos disponibles con los filtros seleccionados</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage