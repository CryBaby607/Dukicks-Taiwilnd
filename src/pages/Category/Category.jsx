import { useState, useMemo, useEffect } from 'react'
import { getProductsByCategory } from '../../services/product'
import { sortProducts, getSortOptions } from '../../utils/sorting'
import { getUniqueBrands, applyFilters } from '../../utils/filters'
import ProductCard from '../../components/ProductCard/ProductCard'

function CategoryPage({ category }) {
  const [selectedBrand, setSelectedBrand] = useState('Todas')
  const [sortBy, setSortBy] = useState('price-low')
  const [products, setProducts] = useState([])

  useEffect(() => {
    const loadCategoryProducts = async () => {
      try {
        const data = await getProductsByCategory(category)
        setProducts(data)
      } catch (err) {
        console.error('Error al cargar productos:', err)
        setProducts([])
      }
    }

    loadCategoryProducts()
  }, [category])

  const brandsInCategory = useMemo(
    () => getUniqueBrands(products, true),
    [products]
  )

  const filteredProducts = useMemo(() => {
    return applyFilters(products, { brand: selectedBrand })
  }, [products, selectedBrand])

  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts, sortBy)
  }, [filteredProducts, sortBy])

  return (
    <div className="min-h-screen bg-light">
      <div className="container mx-auto px-4">
        {/* Layout Grid: Sidebar (250px) + Contenido */}
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 py-12">
          
          {/* Sidebar */}
          <aside className="flex flex-col gap-8 h-fit">
            
            {/* Filtro Marcas */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-title text-lg font-bold text-primary mb-4 uppercase tracking-tight pb-2 border-b border-light">
                Marcas
              </h3>
              <div className="flex flex-col gap-2">
                {brandsInCategory.map(brand => (
                  <button
                    key={brand}
                    className={`
                      w-full bg-light border-2 border-transparent text-primary px-4 py-2 rounded-md 
                      font-semibold cursor-pointer transition-all text-left flex justify-between items-center text-base
                      hover:bg-white hover:border-accent hover:text-accent
                      ${selectedBrand === brand ? 'bg-accent text-white border-accent hover:bg-accent hover:text-white' : ''}
                    `}
                    onClick={() => setSelectedBrand(brand)}
                    aria-pressed={selectedBrand === brand}
                  >
                    {brand}
                    <span className={`text-sm font-semibold ${selectedBrand === brand ? 'text-white/90' : 'text-gray-600/80'}`}>
                      ({brand === 'Todas'
                        ? products.length
                        : products.filter(p => p.brand === brand).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filtro Ordenar */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-title text-lg font-bold text-primary mb-4 uppercase tracking-tight pb-2 border-b border-light">
                Ordenar Por
              </h3>
              <select
                className="w-full p-2 border-2 border-light rounded-md bg-white text-primary text-base font-semibold cursor-pointer transition-all focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 hover:border-accent"
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

          {/* Contenido Principal */}
          <section className="flex flex-col gap-8">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <p className="text-base text-gray-600 font-semibold m-0">
                Mostrando {sortedProducts.length} de {products.length} productos
              </p>
            </div>

            {/* Grid de Productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProducts.length > 0 ? (
                sortedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant="default"
                    showCategory={false}
                  />
                ))
              ) : (
                <div className="col-span-full text-center p-12 bg-white rounded-lg">
                  <p className="text-lg text-gray-600 m-0">
                    No hay productos disponibles con los filtros seleccionados
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage