import React from 'react'
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
      <footer className='bg-gray-100  text-black py-8 px-4 md:px-16 lg:px-24'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Columna 1 */}
          <div className='flex flex-col items-start gap-4'>
            <h3 className='text-xl font-semibold '>LameDiscos</h3>
            <p className='mt-4'>
            Descubre joyas musicales en vinilo. Ediciones especiales,<br />
            clásicos imprescindibles y lanzamientos exclusivos para tu colección.
            </p>
          </div>
  
          {/* Columna 2 */}
          <div className='flex flex-col md:items-center'>
            <h4 className='text-lg font-semibold'>Explora la tienda</h4>
            <ul className='mt-4 space-y-2'>
              <li><Link to="/" className='hover:underline'>Inicio</Link></li>
              <li><Link to="/shop" className='hover:underline'>Géneros</Link></li>
              <li><Link to="/contact" className='hover:underline'>Contacto</Link></li>
              <li><Link to="/about" className='hover:underline'>Sobre Nosotros</Link></li>
            </ul>
          </div>
  
          {/* Columna 3 */}
          <div className='flex flex-col items-center md:items-start'>
          <h4 className='text-lg font-semibold'>Redes Sociales</h4>
            <div className='flex space-x-4 mt-4'>
              <a href="#" className='hover:text-gray-400'><FaFacebook /></a>
              <a href="#" className='hover:text-gray-400'><FaTwitter /></a>
              <a href="#" className='hover:text-gray-400'><FaGithub /></a>
              <a href="#" className='hover:text-gray-400'><FaLinkedin /></a>
            </div>
  
            <div className="flex flex-col justify-center items-start gap-4 mt-8">
                                 <p className="font-bold uppercase">Suscríbete a nuestra newsletter</p>
                                <form className="flex justify-center items-center gap-4">
                                    <input
                                    type="email"
                                    placeholder="Ingresa tu email"
                                    className="w-full p-3 rounded-md border border-gray-300"
                                    />
                                    <button
                                    className="bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-secondary transition"
                                    >
                                    SUSCRÍBETE
                                    </button>
                                </form>
                            </div>
          </div>
        </div>
            
        {/* Footer final */}
        <div className='mt-8 border-t border-gray-700 pt-4'>
          <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
          <p>&copy; {new Date().getFullYear()} LameDiscos. Todos los derechos reservados.</p>
            <div className='flex space-x-4 mt-4 md:mt-0'>
            <Link to="/shop" className="hover:underline">Políticas de privacidad</Link>
            <Link to="/shop" className="hover:underline">Términos y condiciones</Link>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer