import React , { useEffect } from "react"
import { Link } from "react-router-dom";
import intro from "../assets/oferta.jpg"
import AOS from "aos";
import 'aos/dist/aos.css';


const Types = () => {


 useEffect(() =>{
        AOS.init({
            offset: 100,
            duration: 500,
            easing: 'ease-in-out',
        });
        AOS.refresh();

      },[])



return (
    <div className="w-full lg:px-20 px-5 py-[80px] grid lg:grid-cols-3 grid-cols-1 justify-center items-start gap-10"> 
        <div data-aos ="zoom-in" data-aos-delay ="100" className="flex flex-col justify-center items-end gap-8 
        bg-cover bg-center p-10 rounded-lg" style={{ backgroundImage: `url(${intro})` }}>
        <h1 className="text-white border rounded-lg border-white px-6 py-2 text-lg">30%</h1>
        <h1 className="text-2xl text-end text-white font-semibold">vinilos <br />clásicos </h1>
        <Link
            to="/producto/vinilo-clasico"
            className="bg-primary px-6 py-3 rounded-lg text-white font-semibold text-center"
            >
            COMPRAR AHORA
            </Link> 
        </div>
        <div data-aos ="zoom-in" data-aos-delay ="100" className="flex flex-col justify-center items-end gap-8 
        bg-cover bg-center p-10 rounded-lg" style={{ backgroundImage: `url(${intro})` }}>
         <h1 className="text-white border rounded-lg border-white px-6 py-2 text-lg">30%</h1>
        <h1 className="text-2xl text-end text-white font-semibold">vinilos <br />clásicos </h1>
            <Link
            to="/producto/vinilo-clasico"
            className="bg-primary px-6 py-3 rounded-lg text-white font-semibold text-center"
            >
            COMPRAR AHORA
            </Link>   
        </div> 
        <div data-aos ="zoom-in" data-aos-delay ="100" className="flex flex-col justify-center items-end gap-8 
        bg-cover bg-center p-10 rounded-lg" style={{ backgroundImage: `url(${intro})` }}>
        <h1 className="text-white border rounded-lg border-white px-6 py-2 text-lg">30%</h1>
        <h1 className="text-2xl text-end text-white font-semibold">vinilos <br />clásicos </h1>
        <Link
            to="/producto/vinilo-clasico"
            className="bg-primary px-6 py-3 rounded-lg text-white font-semibold text-center"
            >
            COMPRAR AHORA
            </Link>  
        </div> 
    </div>
    

)

}
export default Types