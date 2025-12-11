import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getFeaturedProducts } from '../../services/product'
import ProductCard from '../../components/ProductCard/ProductCard'

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    loadFeaturedProducts()
  }, [])

  const loadFeaturedProducts = async () => {
    try {
      const products = await getFeaturedProducts()
      setFeaturedProducts(products)
    } catch (error) {
      console.error("Error loading featured:", error)
    }
  }

  const categories = [
    {
      id: 1,
      name: 'Hombre',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=400&fit=crop',
      link: '/hombre'
    },
    {
      id: 2,
      name: 'Mujer',
      image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=400&fit=crop',
      link: '/mujer'
    },
    {
      id: 3,
      name: 'Gorras',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=400&fit=crop',
      link: '/gorras'
    }
  ]

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative h-[500px] lg:h-[600px] flex items-center overflow-hidden bg-gradient-to-br from-primary to-dark-gray">
        {/* Imagen de fondo con overlay */}
        <div 
          className="absolute inset-0 z-[1] opacity-15 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1920&h=1080&fit=crop')" }}
        ></div>

        <div className="relative z-[3] w-full h-full flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="max-w-[650px] text-center mx-auto px-4">
              <h1 className="font-title text-4xl md:text-5xl font-bold leading-tight text-white mb-6 uppercase">
                Bienvenido a DUKICKS
              </h1>
              <p className="text-lg text-white/90 leading-relaxed mb-8 max-w-[550px] mx-auto">
                Encuentra tu estilo perfecto con las mejores marcas del mercado.
              </p>
              <div className="flex gap-4 flex-wrap justify-center">
                <Link to="/hombre" className="btn btn-primary">
                  Ver Colección
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-title text-3xl md:text-4xl font-bold text-primary m-0 uppercase tracking-tight">
              Productos Destacados
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant="featured"
                  showCategory={true}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">Cargando destacados...</p>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-title text-3xl md:text-4xl font-bold text-primary m-0 uppercase tracking-tight">
              Compra por Categoría
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                to={category.link}
                key={category.id}
                className="group relative rounded-2xl overflow-hidden cursor-pointer block transform transition-transform duration-300 hover:-translate-y-2"
                aria-label={`Ver productos de ${category.name}`}
              >
                <div className="relative h-[280px] overflow-hidden">
                  <img
                    src={category.image}
                    alt={`Categoría ${category.name}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <h3 className="absolute bottom-6 left-6 right-6 font-title text-2xl font-bold text-white m-0 uppercase z-10">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-[900px] mx-auto text-center">
            <div className="mb-12">
              <h2 className="font-title text-3xl md:text-4xl font-bold text-primary mb-6 uppercase tracking-tight leading-tight">
                Más que una tienda, una <span className="text-accent">comunidad</span>
              </h2>
              <p className="text-lg text-dark-gray leading-relaxed mb-4">
                En DUKICKS no solo vendemos tenis y gorras, creamos conexiones.
                Desde 2013, hemos sido el punto de encuentro para los amantes de la cultura urbana y el streetwear.
              </p>
              <p className="text-lg text-dark-gray leading-relaxed">
                Nuestra pasión por la moda urbana nos impulsa a buscar constantemente las piezas más exclusivas
                y las colaboraciones más esperadas, siempre manteniendo la autenticidad que nos caracteriza.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {[
                { number: '10+', label: 'Años de Experiencia' },
                { number: '50K+', label: 'Clientes Satisfechos' },
                { number: '200+', label: 'Marcas Exclusivas' },
                { number: '24/7', label: 'Soporte al Cliente' }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="font-title text-4xl font-bold text-accent leading-none">
                    {stat.number}
                  </span>
                  <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home