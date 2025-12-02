import React , { useEffect } from "react"
import shipping from "../assets/shipping.png"
import payment from "../assets/payment.png"
import returnPolicy from "../assets/return.png"
import AOS from "aos";
import 'aos/dist/aos.css';



const Services = () =>{


 useEffect(() =>{
        AOS.init({
            offset: 100,
            duration: 500,
            easing: 'ease-in-out',
        });
        AOS.refresh();

      },[])

return(

    <div className="w-full lg:px-20 px-5 mt-28 mb-20 grid lg:grid-cols-3 grid-cols-1 justify-center items-center text-center gap-10">
    <div data-aos="zoom-in" data-aos-delay="100" className="flex flex-col justify-center items-center gap-2">
      <img src={shipping} alt="" className="mb-[20px] w-[60px]" />
      <h1 className="text-xl text-black font-semibold">Envío internacional</h1>
      <p className="text-[17px] text-gray-500">
        Realizamos envíos a cualquier parte del mundo con seguimiento y garantía de entrega.
      </p>
    </div>
    <div data-aos="zoom-in" data-aos-delay="100" className="flex flex-col justify-center items-center gap-2">
      <img src={payment} alt="" className="mb-[20px] w-[60px]" />
      <h1 className="text-xl text-black font-semibold">Pago totalmente seguro</h1>
      <p className="text-[17px] text-gray-500">
        Tu información está protegida con los más altos estándares de seguridad y cifrado.
      </p>
    </div>
    <div data-aos="zoom-in" data-aos-delay="100" className="flex flex-col justify-center items-center gap-2">
      <img src={returnPolicy} alt="" className="mb-[20px] w-[60px]" />
      <h1 className="text-xl text-black font-semibold">Devolución garantizada en 14 días</h1>
      <p className="text-[17px] text-gray-500">
        Si no estás satisfecho con tu compra, puedes devolverla sin complicaciones en un plazo de 14 días.
      </p>
    </div>
  </div>
  

)

}
export default Services