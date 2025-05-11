import { useParams, Link } from "react-router-dom";
const mockData = {
    rock: [
      { id: 1, slug: "queen", title: "Queen – Greatest Hits", img: "/assets/macMiller.jpg" },
      { id: 2, slug: "nirvana", title: "Nirvana – Nevermind", img: "/assets/macMiller.jpg" },
      { id: 3, slug: "acdc", title: "AC/DC – Back in Black", img: "/assets/macMiller.jpg" },
      { id: 4, slug: "led-zeppelin", title: "Led Zeppelin IV", img: "/assets/macMiller.jpg" },
      { id: 5, slug: "pink-floyd", title: "Pink Floyd – The Wall", img: "/assets/macMiller.jpg" },
      { id: 6, slug: "guns-n-roses", title: "Guns N' Roses – Appetite for Destruction", img: "/assets/macMiller.jpg" }
    ],
    jazz: [
      { id: 7, slug: "coltrane", title: "John Coltrane – Blue Train", img: "/assets/macMiller.jpg" },
      { id: 8, slug: "miles", title: "Miles Davis – Kind of Blue", img: "/assets/macMiller.jpg" },
      { id: 9, slug: "ella", title: "Ella Fitzgerald – Ella and Louis", img: "/assets/macMiller.jpg" },
      { id: 10, slug: "bill-evans", title: "Bill Evans – Waltz for Debby", img: "/assets/macMiller.jpg" },
      { id: 11, slug: "mingus", title: "Charles Mingus – Ah Um", img: "/assets/macMiller.jpg" },
      { id: 12, slug: "thelonious", title: "Thelonious Monk – Brilliant Corners", img: "/assets/macMiller.jpg" }
    ],
    pop: [
      { id: 13, slug: "madonna", title: "Madonna – Like a Virgin", img: "/assets/macMiller.jpg" },
      { id: 14, slug: "mj", title: "Michael Jackson – Thriller", img: "/assets/macMiller.jpg" },
      { id: 15, slug: "adele", title: "Adele – 21", img: "/assets/macMiller.jpg" },
      { id: 16, slug: "dua-lipa", title: "Dua Lipa – Future Nostalgia", img: "/assets/macMiller.jpg" },
      { id: 17, slug: "harry-styles", title: "Harry Styles – Fine Line", img: "/assets/macMiller.jpg" },
      { id: 18, slug: "lady-gaga", title: "Lady Gaga – Chromatica", img: "/assets/macMiller.jpg" }
    ],
    electronica: [
      { id: 19, slug: "daft-punk", title: "Daft Punk – Discovery", img: "/assets/macMiller.jpg" },
      { id: 20, slug: "kraftwerk", title: "Kraftwerk – The Man-Machine", img: "/assets/macMiller.jpg" },
      { id: 21, slug: "flume", title: "Flume – Skin", img: "/assets/macMiller.jpg" },
      { id: 22, slug: "justice", title: "Justice – †", img: "/assets/macMiller.jpg" },
      { id: 23, slug: "avicii", title: "Avicii – True", img: "/assets/macMiller.jpg" },
      { id: 24, slug: "calvin-harris", title: "Calvin Harris – 18 Months", img: "/assets/macMiller.jpg" }
    ],
    hiphop: [
      { id: 25, slug: "tupac", title: "2Pac – All Eyez on Me", img: "/assets/macMiller.jpg" },
      { id: 26, slug: "kendrick", title: "Kendrick Lamar – DAMN.", img: "/assets/macMiller.jpg" },
      { id: 27, slug: "jayz", title: "Jay-Z – The Blueprint", img: "/assets/macMiller.jpg" },
      { id: 28, slug: "eminem", title: "Eminem – The Marshall Mathers LP", img: "/assets/macMiller.jpg" },
      { id: 29, slug: "nas", title: "Nas – Illmatic", img: "/assets/macMiller.jpg" },
      { id: 30, slug: "kanye", title: "Kanye West – Graduation", img: "/assets/macMiller.jpg" }
    ],
    soul: [
      { id: 31, slug: "aretha", title: "Aretha Franklin – Lady Soul", img: "/assets/macMiller.jpg" },
      { id: 32, slug: "marvin", title: "Marvin Gaye – What's Going On", img: "/assets/macMiller.jpg" },
      { id: 33, slug: "al-green", title: "Al Green – Let's Stay Together", img: "/assets/macMiller.jpg" },
      { id: 34, slug: "otis", title: "Otis Redding – Otis Blue", img: "/assets/macMiller.jpg" },
      { id: 35, slug: "sam-cooke", title: "Sam Cooke – Ain’t That Good News", img: "/assets/macMiller.jpg" },
      { id: 36, slug: "bill-withers", title: "Bill Withers – Just As I Am", img: "/assets/macMiller.jpg" }
    ],
    salsa: [
      { id: 37, slug: "celia-cruz", title: "Celia Cruz – La Vida es un Carnaval", img: "/assets/macMiller.jpg" },
      { id: 38, slug: "hector-lavoe", title: "Héctor Lavoe – El Cantante", img: "/assets/macMiller.jpg" },
      { id: 39, slug: "ruben-blades", title: "Rubén Blades – Siembra", img: "/assets/macMiller.jpg" },
      { id: 40, slug: "gran-combo", title: "El Gran Combo – Grandes Éxitos", img: "/assets/macMiller.jpg" },
      { id: 41, slug: "willie-colon", title: "Willie Colón – Cosa Nuestra", img: "/assets/macMiller.jpg" },
      { id: 42, slug: "fruko", title: "Fruko y sus Tesos – El Violento", img: "/assets/macMiller.jpg" }
    ],
    flamenco: [
      { id: 43, slug: "james-brown", title: "James Brown – The Payback", img: "/assets/macMiller.jpg" },
      { id: 44, slug: "parliament", title: "Parliament – Mothership Connection", img: "/assets/macMiller.jpg" },
      { id: 45, slug: "sly-stone", title: "Sly & The Family Stone – Stand!", img: "/assets/macMiller.jpg" },
      { id: 46, slug: "rick-james", title: "Rick James – Street Songs", img: "/assets/macMiller.jpg" },
      { id: 47, slug: "earth-wind", title: "Earth, Wind & Fire – That's the Way of the World", img: "/assets/macMiller.jpg" },
      { id: 48, slug: "tower-of-power", title: "Tower of Power – Urban Renewal", img: "/assets/macMiller.jpg" }
    ],
    indie: [
      { id: 49, slug: "arcade-fire", title: "Arcade Fire – The Suburbs", img: "/assets/macMiller.jpg" },
      { id: 50, slug: "tame-impala", title: "Tame Impala – Currents", img: "/assets/macMiller.jpg" },
      { id: 51, slug: "vampire-weekend", title: "Vampire Weekend – Modern Vampires", img: "/assets/macMiller.jpg" },
      { id: 52, slug: "the-strokes", title: "The Strokes – Is This It", img: "/assets/macMiller.jpg" },
      { id: 53, slug: "arctic-monkeys", title: "Arctic Monkeys – AM", img: "/assets/macMiller.jpg" },
      { id: 54, slug: "phoenix", title: "Phoenix – Wolfgang Amadeus Phoenix", img: "/assets/macMiller.jpg" }
    ]
  };
  

export default function Category() {
  const { categoria } = useParams();
  const productos = mockData[categoria] || [];

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold capitalize mb-6">Género: {categoria}</h1>

      {productos.length === 0 ? (
        <p className="text-gray-500">No hay productos disponibles para esta categoría aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <Link
              to={`/producto/${producto.id}`}
              key={producto.id}
              className="border rounded-xl p-4 hover:shadow-lg transition"
            >
              <img src={producto.img} alt={producto.title} className="rounded-lg mb-4" />
              <h2 className="text-xl font-semibold">{producto.title}</h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
