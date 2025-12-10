import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookF,
  faInstagram,
  faTiktok
} from '@fortawesome/free-brands-svg-icons'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white mt-auto">
      {/* Main Footer Content */}
      <div className="py-12 md:py-16 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">

            {/* Columna Marca */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h3 className="font-title text-3xl font-bold -tracking-[0.5px] m-0">
                  <span className="text-white">DU</span>
                  <span className="text-accent">KICKS</span>
                </h3>
                <p className="text-sm leading-relaxed text-white/80 m-0 max-w-[280px]">
                  Tu destino para el mejor calzado deportivo y streetwear. 
                  Encuentra las últimas tendencias y los clásicos que nunca pasan de moda.
                </p>
              </div>

              <div className="flex gap-4 mt-2">
                {[
                  { icon: faFacebookF, href: 'https://facebook.com', label: 'Facebook' },
                  { icon: faInstagram, href: 'https://instagram.com', label: 'Instagram' },
                  { icon: faTiktok, href: 'https://tiktok.com', label: 'TikTok' }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={`Síguenos en ${social.label}`}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-lg transition-all hover:bg-accent hover:text-white hover:-translate-y-1"
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </a>
                ))}
              </div>
            </div>

            {/* Columna Enlaces */}
            <div className="flex flex-col gap-4">
              <h4 className="font-title text-lg font-semibold text-white uppercase tracking-wider m-0 mb-2">
                Enlaces rápidos
              </h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-2">
                {[
                  { name: 'Inicio', href: '/' },
                  { name: 'Hombre', href: '/hombre' },
                  { name: 'Mujer', href: '/mujer' },
                  { name: 'Gorras', href: '/gorras' }
                ].map((link) => (
                  <li key={link.name} className="m-0">
                    <a 
                      href={link.href} 
                      className="text-sm text-white/80 no-underline transition-all relative inline-block hover:text-accent hover:translate-x-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="py-6 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center text-center">
            <p className="text-sm text-white/70 m-0">
              &copy; {currentYear} <strong className="font-bold text-white">DUKICKS</strong>. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer