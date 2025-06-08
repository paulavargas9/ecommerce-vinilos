import React ,{ useEffect } from "react"
import cat1 from "../assets/hiphop.webp"
import cat2 from "../assets/salsa.webp"
import cat3 from "../assets/vinilo.webp"
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";



const Items =() => {

    const { products, loading, error } = useProducts();

 useEffect(() =>{
        AOS.init({
            offset: 100,
            duration: 500,
            easing: 'ease-in-out',
        });
        AOS.refresh();

      },[])


      return (

        <div id="items" className="w-full bg-gray-100 lg:px-20 px-5 pt-[130px] pb-[80px] flex lg:flex-row flex-col justify-center items-center gap-20">
            <div data-aos="zoom-in" data-aos-delays="50" className="lg:w-[15%] w-full flex
            flex-col justify-center lg:items-start items-center gap-[20px]">
            <h1 className="text-primary text-2xl font-semibold text-center">Discos imprescindibles</h1>
            <h1 className="text-black font-semibold text-[42px] leading-[50px] text-center">Géneros populares</h1>
            <Link
            to="/shop"
            className="bg-primary text-white px-8 py-4 rounded-lg font-semibold mt-[40px] text-center hover:bg-white hover:text-primary transition"
            >
            VER TODOS
            </Link>
            </div>   
            <div className="lg:w-[85%] w-full grid lg:grid-cols-3 grid-cols-1 justify-center items-start gap-10">
                <div data-aos="zoom-in" data-aos-delay="50" className="flex flex-col justify-center 
                items-center gap-6">
                    <img src={cat1} alt="vinilo"  className="rounded-full cursor-pointer w-62 h-62 object-cover"/>
                    <Link
                    to="/shop/hiphop-rap"
                    className="text-black text-xl font-semibold hover:text-primary cursor-pointer text-center"
                    >
                    Hip-Hop / Rap
                    </Link>
                </div>
                <div data-aos="zoom-in" data-aos-delay="50" className="flex flex-col justify-center 
                items-center gap-6">
                    <img src={cat2} alt="vinilo"  className="rounded-full cursor-pointerw-62 h-62 object-cover"/>
                    <Link
                    to="/shop/salsa"
                    className="text-black text-xl font-semibold hover:text-primary cursor-pointer text-center"
                    >
                    Salsa y Ritmos Latinos
                    </Link>
                </div>
                <div data-aos="zoom-in" data-aos-delay="50" className="flex flex-col justify-center 
                items-center gap-6">
                    <img src={cat3} alt="vinilo"  className="rounded-full cursor-pointer w-62 h-62 object-cover"/>
                    <Link
                    to="/shop/electronica"
                    className="text-black text-xl font-semibold hover:text-primary cursor-pointer text-center"
                    >
                    Electrónica & Alternativo
                    </Link>
                  </div>

             </div>
     </div> 
            
         
      )

}

export default Items





