import { library } from '@fortawesome/fontawesome-svg-core'

// Importar iconos Solid
import {
  faMagnifyingGlass,
  faShoppingCart,
  faBars,
  faTimes,
  faArrowLeft,    
  faCheck,        
  faTruck,        
  faShieldAlt,    
  faSync          
} from '@fortawesome/free-solid-svg-icons'

// Importar iconos de Marcas (Brands)
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faTiktok,
  faWhatsapp  
} from '@fortawesome/free-brands-svg-icons'

// Registrar todos los iconos en la librería
library.add(
  // Iconos Solid
  faMagnifyingGlass,
  faShoppingCart,
  faBars,
  faTimes,
  faArrowLeft,    
  faCheck,        
  faTruck,       
  faShieldAlt,    
  faSync,         
  // Iconos Brands
  faFacebookF,
  faInstagram,
  faTwitter,
  faTiktok,
  faWhatsapp
)