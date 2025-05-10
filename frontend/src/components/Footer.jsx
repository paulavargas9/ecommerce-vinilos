import React from 'react'
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
      <footer className='bg-primary text-black py-8 px-4 md:px-16 lg:px-24'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Columna 1 */}
          <div>
            <h3 className='text-xl font-semibold'>LameDiscos</h3>
            <p>
            Descubre joyas musicales en vinilo. Ediciones especiales,<br />
            clásicos imprescindibles y lanzamientos exclusivos para tu colección.
            </p>
          </div>
  
          {/* Columna 2 */}
          <div className='flex flex-col md:items-center'>
            <h4 className='text-lg font-semibold'>MENU</h4>
            <ul className='mt-4 space-y-2'>
              <li><Link to="/" className='hover:underline'>Inicio</Link></li>
              <li><Link to="/shop" className='hover:underline'>Géneros</Link></li>
              <li><Link to="/contact" className='hover:underline'>Contacto</Link></li>
              <li><Link to="/about" className='hover:underline'>Sobre Nosotros</Link></li>
            </ul>
          </div>
  
          {/* Columna 3 */}
          <div className='flex flex-col items-center md:items-start'>
            <div className='flex space-x-4 mt-8'>
              <a href="#" className='hover:text-gray-400'><FaFacebook /></a>
              <a href="#" className='hover:text-gray-400'><FaTwitter /></a>
              <a href="#" className='hover:text-gray-400'><FaGithub /></a>
              <a href="#" className='hover:text-gray-400'><FaLinkedin /></a>
            </div>
  
            <form className='flex items-center justify-center mt-8'>
              <input
                type="email"
                placeholder="Enter Email"
                className='w-full p-2 rounded-lg bg-gray-800 border border-gray-600'
              />
              <button className='bg-red-600 text-white px-4 py-2 rounded-lg border border-gray-600'>
                Subscribe
              </button>
            </form>
          </div>
        </div>
  
        {/* Footer Bottom Bar */}
        <div className='mt-8 border-t border-gray-700 pt-4'>
          <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
            <p>&copy; 2024 e-Shop. All rights reserved.</p>
            <div className='flex space-x-4 mt-4 md:mt-0'>
              <a href="#" className='hover:underline'>Privacy Policy</a>
              <a href="#" className='hover:underline'>Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer