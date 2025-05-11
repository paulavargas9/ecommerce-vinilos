import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const genres = [
  { name: "Rock", path: "rock" },
  { name: "Jazz", path: "jazz" },
  { name: "Pop", path: "pop" },
  { name: "Electrónica", path: "electronica" },
  { name: "Hip-Hop / Rap", path: "hiphop" },
  { name: "Soul / R&B", path: "soul" },
  { name: "Salsa", path: "salsa" },
  { name: "Flamenco", path: "flamenco" },
  { name: "Indie / Alternativo", path: "indie" }
 
];

export default function Shop() {
  useEffect(() => {
    AOS.init({ duration: 600, offset: 100 });
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-center mb-8">Explora por Géneros</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {genres.map((genre, index) => (
          <Link
            to={`/shop/${genre.path}`}
            key={genre.path}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
            className="border border-gray-300 p-6 rounded-xl text-center hover:bg-primary hover:text-white transition font-semibold text-lg"
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
