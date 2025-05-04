import React , { useEffect } from "react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import intro from "../assets/layout2.jpg"
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
      </div>
    </div>
  </Slider>
</div>

)


}
export default Hero