// src/utils/whatsapp.js

/**
 * Genera el mensaje de WhatsApp con el resumen del carrito
 */
export const generateWhatsAppMessage = (cartItems, total) => {
  if (!cartItems || cartItems.length === 0) {
    return ''
  }

  let message = '*🛍️ PEDIDO DUKICKS*\n\n'
  
  // Listar productos
  cartItems.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`
    message += `   Talla: ${item.size || 'N/A'}\n`
    message += `   Cantidad: ${item.quantity}\n`
    message += `   Precio: $${item.price.toLocaleString()}\n`
    message += `   Subtotal: $${(item.price * item.quantity).toLocaleString()}\n\n`
  })

  // Total
  message += `━━━━━━━━━━━━━━━━\n`
  message += `*TOTAL: $${total.toLocaleString()} MXN*\n\n`
  message += `_Gracias por tu preferencia_ 🙌`

  return encodeURIComponent(message)
}

/**
 * Genera la URL de WhatsApp con el mensaje
 */
export const generateWhatsAppURL = (phoneNumber, cartItems, total) => {
  const message = generateWhatsAppMessage(cartItems, total)
  const cleanPhone = phoneNumber.replace(/\D/g, '') // Remover caracteres no numéricos
  
  // Detectar si es móvil o desktop
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  if (isMobile) {
    return `whatsapp://send?phone=${cleanPhone}&text=${message}`
  } else {
    return `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${message}`
  }
}

/**
 * Abre WhatsApp con el pedido
 */
export const sendOrderViaWhatsApp = (phoneNumber, cartItems, total) => {
  const url = generateWhatsAppURL(phoneNumber, cartItems, total)
  window.open(url, '_blank')
}

/**
 * Valida el número de teléfono
 */
export const validatePhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '')
  // México: 10 dígitos o 52 + 10 dígitos
  return cleaned.length === 10 || (cleaned.length === 12 && cleaned.startsWith('52'))
}

/**
 * Formatea el número de teléfono para WhatsApp
 */
export const formatPhoneForWhatsApp = (phone) => {
  let cleaned = phone.replace(/\D/g, '')
  
  // Si es número mexicano de 10 dígitos, agregar código de país
  if (cleaned.length === 10) {
    cleaned = '52' + cleaned
  }
  
  return cleaned
}