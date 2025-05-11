import React ,{ useEffect } from "react"
import cat1 from "../assets/macMiller.jpg"
import cat2 from "../assets/macMiller.jpg"
import cat3 from "../assets/macMiller.jpg"
import cat4 from "../assets/macMiller.jpg"
import cat5 from "../assets/macMiller.jpg"
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";



const Items =() => {

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
                    <img src={cat1} alt="vinilo"  className="rounded-full cursor-pointer"/>
                    <Link
                    to="/producto/mac-miller"
                    className="text-black text-xl font-semibold hover:text-primary cursor-pointer"
                    >
                    Mac Miller Vinilo Edición especial
                    </Link>
                </div>
                <div data-aos="zoom-in" data-aos-delay="50" className="flex flex-col justify-center 
                items-center gap-6">
                    <img src={cat2} alt="vinilo"  className="rounded-full cursor-pointer"/>
                    <Link
                    to="/producto/mac-miller"
                    className="text-black text-xl font-semibold hover:text-primary cursor-pointer"
                    >
                    Mac Miller Vinilo Edición especial
                    </Link>
                </div>
                <div data-aos="zoom-in" data-aos-delay="50" className="flex flex-col justify-center 
                items-center gap-6">
                    <img src={cat3} alt="vinilo"  className="rounded-full cursor-pointer"/>
                    <Link
                        to="/producto/mac-miller"
                        className="text-black text-xl font-semibold hover:text-primary cursor-pointer"
                        >
                        Mac Miller Vinilo Edición especial
                        </Link>
                  </div>


             </div>
     </div> 
            
         
      )

}

export default Items





