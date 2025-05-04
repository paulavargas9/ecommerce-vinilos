import { navbarLinks } from "../data/data";
import { CiSearch } from "react-icons/ci";
import { MdMenu } from "react-icons/md";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { useState } from "react";
import ResponsiveMenu from './ResponsiveMenu';



const  NavBar = () => {
    const[open, setOpen] = useState (false);
    return(
        <>
        <nav>
        <div className='container flex justify-between items-center py-8'>
        {/*Logo section*/}
        <div className='text-2xl flex items-center gap-2 font-bold uppercase'>
        <img src="../img/logo.webp" alt="Logo" className="h-10 w-auto" />
        <span className="text-2xl font-bold">LAMEDISCOS</span>  
        </div>
         {/*Menu section*/}
         <div className="hidden md:block">
            <ul className="flex items-center gap-6 text-gray-600">
                {navbarLinks.map((item) => (
                    <li key={item.id}>
                        <a 
                        href={item.link}
                        className='inline-block py-1 px-3 hover:text-primary 
                        font-semibold'>
                            {item.title}
                        </a>                   
                    </li>
                ))}
            </ul>      
         </div>
          {/*icons section section*/}
                <div className='flex items-center gap-4'>
                <button 
                className='text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200'>
                    <CiSearch/>   
                </button>
                <button 
                className='text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200'>
                    <PiShoppingCartSimpleThin/>   
                </button>
                <button 
                className='text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200'>
                    <CiHeart/>   
                </button>
                <button className='hover:bg-primary text-primary font-semibold
                hover:text-white rounded-md border-primary px-6 py-2 duration-200 hidden md:block'>
                    INICIAR SESION
                </button>

                </div>
           {/*Mobile hamburguer section*/}
                <div className="md:hidden">
                    <MdMenu 
                    onClick={() => setOpen(!open)}
                    className ='text-4xl' />
                </div>
           </div>
        </nav>
        
         {/*Mobile slider section*/}
         <ResponsiveMenu open ={open} navbarLinks ={navbarLinks}/>
        </>
    );
};

export default NavBar;