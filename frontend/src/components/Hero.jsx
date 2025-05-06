import React , { useEffect } from "react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import intro from "../assets/layout2.jpg"
import bestSellers from "../assets/slider2.jpg"
import discountedVinyls from "../assets/slider3.3.jpg"
import AOS from "aos";
import 'aos/dist/aos.css';

const Hero  = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrowsL:false
      };

      useEffect(() =>{
        AOS.init({
            offset: 100,
            duration: 500,
            easing: 'ease-in-out',
        });
        AOS.refresh();

      },[])

return (
<div id="hero" className="w-full flex justify-center items-center h-[600px] lg:h-[700px] overflow-hidden">
  <Slider className="w-full" {...settings}>
    <div>
      <div
        className="w-full h-[600px] lg:h-[700px] px-5 lg:px-20 flex flex-col justify-center items-start gap-10 bg-center bg-cover"
        style={{ backgroundImage: `url(${intro})` }}
      >
        {/*Descripcion y botón */}
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Descubre tu sonido perfecto</h1>
        <p className="text-lg max-w-xl drop-shadow-md">
        En LameDiscos descubrirás los mejores vinilos clásicos y modernos, seleccionados para quienes saben lo que quieren escuchar. Stock real, envíos rápidos y atención de verdad. Si te importa el sonido, este es tu sitio.
        </p>

        <button data-aos="zoom-in" data-aos-delay="200"
        className="bg-primary px-6 py-3 rounded-lg text-white font-semibold
         shadow-md hover:bg-white hover:text-primary transition duration-300">VER CATALOGO</button>
      </div>
    </div>
    <div>
      <div
        className="w-full h-[600px] lg:h-[700px] px-5 lg:px-20 flex flex-col justify-center items-start gap-10 bg-center bg-cover "
        style={{ backgroundImage: `url(${bestSellers})` }}
      >
        {/*Tendencias */}
        <div className="text-center text-white">
            <h1 className="text-2xl md:text-4xl font-extrabold drop-shadow-lg">Vinilos en Tendencia</h1>
            <button className="mt-6 bg-primary text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-white hover:text-primary transition duration-300 shadow-lg">
            VER TENDENCIAS
            </button>
        </div>
      </div>
    </div>
    <div>
      <div
        className="w-full h-[600px] lg:h-[700px] px-5 lg:px-20 flex flex-col justify-center  gap-6 bg-center bg-cover  "
        style={{ backgroundImage: `url(${discountedVinyls})` }}
      >
        {/*nuevas joyas*/}
        <h1 className=" self-end text-white text-2xl md:text-4xl text-right font-bold drop-shadow-2xl">NUEVAS JOYAS PARA TU COLECCION</h1>

        <button data-aos="zoom-in" data-aos-delay="200"
        className="self-end ml-6 bg-primary px-6 py-3 rounded-lg text-white font-semibold
         shadow-md hover:bg-white hover:text-primary transition duration-300">VERLAS TODAS</button>
      </div>
    </div>
  </Slider>
</div>

)


}
export default Hero