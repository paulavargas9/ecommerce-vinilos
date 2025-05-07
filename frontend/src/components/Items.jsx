
import React ,{ useEffect } from "react"
import cat1 from "../assets/macMiller.jpg"
import AOS from "aos";
import "aos/dist/aos.css";


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

        <div id="items" className="w-full bg-gray-100 lg:px-20 px-5 pt-[130px] pb-[80px] flex 
        lg:flex-row flex-col justify-center items-center gap-20">
            <div data-aos="zoom-in" data-aos-delays="50" className="lg:w-[15%] w-full flex
            flex-col justify-center lg:items-start items-center gap-[20px]"></div>
            <h1 className="text-primary tect-xl font-semibold text-center">Discos imprescindibles</h1>
            <h1 className="text-black font-semibold text-[42px] leading-[50px] text-center">Géneros populares</h1>
            <button  data-aos="zoom-in" data-aos-delays="100" className="bg-primary hover:secondary text-white
            hover:text-black px-8 py-3 rounded-lg font-semibold mt-[60px]">VER TODOS</button>

            <div className="lg:w-[85%] w-full grid lg:grid-col-4 grid-cols-1 justify-center items-start gap-10">
                <div data-aos="zoom-in" data-aos-delays="50" className="flex flex-col justify-center 
                items-center gap-6">
                    <img src={cat1} alt="vinilo"  className="rounded-full cursor-pointer"/>
                <h1 className="text-black text-xl font-semibold hover:text-primary cursor-pointer">Mac Miller Vinilo Edición especial</h1>
                </div>
            </div>
            <div className="lg:w-[85%] w-full grid lg:grid-col-4 grid-cols-1 justify-center items-start gap-10">
                <div data-aos="zoom-in" data-aos-delays="50" className="flex flex-col justify-center 
                items-center gap-6">
                <img src={cat1} alt="vinilo"  className="rounded-full cursor-pointer"/>
                <h1 className="text-black text-xl font-semibold hover:text-primary cursor-pointer">Mac Miller Vinilo Edición especial</h1>
                </div>
            </div>
            <div className="lg:w-[85%] w-full grid lg:grid-col-4 grid-cols-1 justify-center items-start gap-10">
                <div data-aos="zoom-in" data-aos-delays="50" className="flex flex-col justify-center 
                items-center gap-6">
                <img src={cat1} alt="vinilo"  className="rounded-full cursor-pointer"/>
                <h1 className="text-black text-xl font-semibold hover:text-primary cursor-pointer">Mac Miller Vinilo Edición especial</h1>
                </div>
            </div>
           
        </div>
         
      )

}

export default Items





