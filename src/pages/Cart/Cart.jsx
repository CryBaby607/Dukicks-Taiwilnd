import { useCart } from '../../context/CartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { formatPrice } from '../../utils/formatters'
import { sendOrderViaWhatsApp } from '../../services/whatsapp'
import { APP_CONFIG } from '../../constants/app'

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, subtotal, total, itemCount } = useCart()

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío')
      return
    }
    sendOrderViaWhatsApp(APP_CONFIG.BUSINESS_PHONE, cartItems, total)
  }

  const handleQuantityChange = (productId, size, newQuantity) => {
    const quantity = parseInt(newQuantity, 10)
    if (quantity > 0 && quantity <= 99) {
      updateQuantity(productId, size, quantity)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center bg-light">
        <div className="text-center max-w-[500px] px-4">
          <h1 className="font-title text-3xl font-bold text-primary mb-4">Tu carrito está vacío</h1>
          <p className="text-lg text-gray mb-8">
            Agrega productos para comenzar tu compra y lucir increíble.
          </p>
          <a href="/" className="btn btn-primary">
            Explorar Productos
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 bg-light">
      <div className="container mx-auto px-4">
        <h1 className="font-title text-4xl font-bold text-primary mb-12 uppercase tracking-tight text-center">
          Carrito de Compras
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          
          {/* Lista de Productos */}
          <section className="bg-white rounded-xl p-6 md:p-8 shadow-md h-fit">
            {/* Header de tabla (Solo visible en Desktop) */}
            <div className="hidden md:grid grid-cols-[100px_1fr_120px_100px_120px_50px] gap-6 pb-4 border-b-2 border-light mb-6 font-bold text-primary text-sm uppercase tracking-wide">
              <span className="col-span-2">Productos</span>
              <span className="text-center">Precio</span>
              <span className="text-center">Cantidad</span>
              <span className="text-center">Subtotal</span>
              <span></span>
            </div>

            <div className="flex flex-col gap-8">
              {cartItems.map((item) => (
                <article 
                  key={`${item.id}-${item.size}`} 
                  className="grid grid-cols-1 md:grid-cols-[100px_1fr_120px_100px_120px_50px] gap-6 items-center p-4 md:p-0 border border-light md:border-none rounded-lg md:rounded-none transition-all hover:shadow-sm md:hover:shadow-none bg-light/30 md:bg-transparent"
                >
                  {/* Imagen */}
                  <div className="w-full h-[200px] md:w-[100px] md:h-[100px] rounded-lg overflow-hidden bg-white shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-1">
                    <h3 className="font-title text-base font-semibold text-primary m-0">{item.name}</h3>
                    <p className="text-xs text-gray uppercase tracking-wide m-0">{item.category}</p>
                    {item.size && (
                      <p className="text-sm font-medium text-dark-gray m-0">Talla: {item.size}</p>
                    )}
                  </div>

                  {/* Precio Unitario */}
                  <div className="flex flex-row md:flex-col justify-between items-center md:text-center">
                    <span className="text-xs text-gray font-semibold uppercase md:hidden">Precio</span>
                    <span className="text-lg font-bold text-primary">{formatPrice(item.price)}</span>
                  </div>

                  {/* Cantidad */}
                  <div className="flex flex-row md:flex-col justify-between items-center md:items-center">
                    <span className="text-xs text-gray font-semibold uppercase md:hidden">Cantidad</span>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, item.size, e.target.value)}
                      className="w-full md:w-16 p-2 text-center border border-gray-300 rounded-md bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                    />
                  </div>

                  {/* Subtotal */}
                  <div className="flex flex-row md:flex-col justify-between items-center md:text-center">
                    <span className="text-xs text-gray font-semibold uppercase md:hidden">Subtotal</span>
                    <span className="text-lg font-bold text-accent">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>

                  {/* Botón Eliminar */}
                  <div className="flex justify-end md:justify-center">
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-error text-error bg-transparent hover:bg-error hover:text-white transition-all duration-200"
                      title="Eliminar producto"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Resumen de Compra */}
          <aside className="h-fit sticky top-24">
            <div className="bg-white rounded-xl p-8 shadow-md flex flex-col gap-6">
              <h2 className="font-title text-xl font-bold text-primary uppercase tracking-tight pb-4 border-b-2 border-light m-0">
                Resumen
              </h2>

              <div className="flex justify-between items-center">
                <span className="text-base text-gray font-semibold">Productos ({itemCount})</span>
                <span className="text-lg font-bold text-primary">{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between items-center py-4 border-t border-light border-b-2 border-accent/50">
                <span className="text-lg font-bold text-primary">Total</span>
                <span className="text-2xl font-bold text-accent">
                  {formatPrice(total)}
                </span>
              </div>

              <button 
                className="btn btn-primary w-full flex items-center justify-center gap-2 py-4 text-base mt-2 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all bg-green-600 border-green-600 hover:bg-green-700 hover:border-green-700"
                onClick={handleWhatsAppCheckout}
              >
                <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
                Realizar Pedido por WhatsApp
              </button>

              <a 
                href="/" 
                className="w-full text-center py-4 bg-transparent border-2 border-primary text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all no-underline"
              >
                Seguir Comprando
              </a>

              <p className="text-xs text-center text-gray mt-2">
                Al hacer clic, se abrirá WhatsApp con el detalle de tu pedido para finalizar la compra.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Cart