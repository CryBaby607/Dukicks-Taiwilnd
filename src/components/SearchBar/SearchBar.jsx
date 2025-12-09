import { useState, useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons'
import { getAllProducts } from '../../services/product'
import { searchProductsWithRelevance } from '../../utils/search'
import { useDebounce } from '../../hooks/useDebounce'
import { getProductImage, getProductName } from '../../utils/imageUtils'

function SearchBar() {
  const navigate = useNavigate()
  const searchRef = useRef(null)
  const inputRef = useRef(null)

  const [isExpanded, setIsExpanded] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [allProducts, setAllProducts] = useState([])
  const [productsLoaded, setProductsLoaded] = useState(false)

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    if (debouncedSearchTerm.trim().length === 0) {
      setSuggestions([])
      setIsOpen(false)
      return
    }

    if (!productsLoaded) {
      setIsOpen(false)
      return
    }

    const results = searchProductsWithRelevance(allProducts, debouncedSearchTerm)
    setSuggestions(results.slice(0, 8))
    setIsOpen(results.length > 0)
  }, [debouncedSearchTerm, allProducts, productsLoaded])

  const handleExpand = useCallback(async () => {
    setIsExpanded(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 200)

    if (!productsLoaded && allProducts.length === 0) {
      try {
        const products = await getAllProducts()
        setAllProducts(products)
        setProductsLoaded(true)
      } catch (error) {
        console.error('Error al cargar productos para búsqueda:', error)
        setProductsLoaded(true)
      }
    }
  }, [productsLoaded, allProducts.length])

  const handleCollapse = useCallback(() => {
    setIsExpanded(false)
    setSearchTerm('')
    setSuggestions([])
    setIsOpen(false)
  }, [])

  const handleSelectProduct = useCallback(
    (productId) => {
      navigate(`/product/${productId}`)
      handleCollapse()
    },
    [navigate, handleCollapse]
  )

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      handleCollapse()
    }
  }

  useEffect(() => {
    if (!isExpanded) return

    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        handleCollapse()
      }
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleCollapse()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isExpanded, handleCollapse])

  return (
    <div
      ref={searchRef}
      className={`relative flex items-center justify-center transition-all duration-300 ${
        isExpanded ? 'fixed top-0 left-0 right-0 z-[9999] bg-primary p-4 shadow-lg animate-fade-in' : ''
      }`}
    >
      {!isExpanded && (
        <button
          className="flex items-center justify-center w-10 h-10 bg-transparent border-none text-white text-lg cursor-pointer rounded-md transition-all duration-200 hover:text-accent hover:bg-white/10"
          onClick={handleExpand}
          aria-label="Abrir búsqueda"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      )}

      {isExpanded && (
        <form className="w-full max-w-[600px] mx-auto relative" onSubmit={handleSearchSubmit}>
          <div className="relative flex items-center bg-white rounded-lg px-4 transition-all duration-300 shadow-md focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-gray-500 text-base mr-2 pointer-events-none shrink-0"
            />

            <input
              ref={inputRef}
              type="text"
              className="flex-1 bg-transparent border-none py-3 text-base text-primary font-text outline-none min-w-0 placeholder:text-gray-400"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button
              type="button"
              onClick={handleCollapse}
              className="bg-transparent border-none text-gray-500 text-base cursor-pointer p-2 ml-1 rounded-md transition-all hover:text-accent hover:bg-accent/10 flex items-center justify-center shrink-0 w-8 h-8"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {isOpen && suggestions.length > 0 && (
            <div className="absolute top-[calc(100%+12px)] left-0 right-0 bg-white border border-gray-100 rounded-lg shadow-xl z-50 overflow-hidden max-h-[500px] overflow-y-auto animate-slide-down">
              <ul className="list-none p-0 m-0 flex flex-col">
                {suggestions.map((product) => (
                  <li key={product.id}>
                    <button
                      type="button"
                      className="w-full flex items-center gap-4 p-4 bg-transparent border-none cursor-pointer transition-all text-left border-b border-gray-100 last:border-b-0 hover:bg-light pl-6"
                      onClick={() => handleSelectProduct(product.id)}
                    >
                      <img
                        src={getProductImage(product)}
                        alt={getProductName(product)}
                        className="w-[50px] h-[50px] object-cover rounded-md shrink-0 bg-gray-100"
                      />
                      <div className="flex-1 flex flex-col gap-1 min-w-0">
                        <span className="text-sm font-semibold text-primary whitespace-nowrap overflow-hidden text-ellipsis">
                          {getProductName(product)}
                        </span>
                        <span className="text-xs text-gray-500 uppercase tracking-wide">
                          {product.category}
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isOpen && searchTerm && suggestions.length === 0 && productsLoaded && (
            <div className="absolute top-[calc(100%+12px)] left-0 right-0 bg-white border border-gray-100 rounded-lg p-6 text-center shadow-xl z-50 animate-slide-down">
              <p className="m-0 text-sm text-gray-500">No encontramos productos para "{searchTerm}"</p>
            </div>
          )}
        </form>
      )}
    </div>
  )
}

export default SearchBar