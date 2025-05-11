import { useParams } from "react-router-dom";

// Todos los productos de todos los géneros
const mockData ={
  rock: [
    { id: 1, slug: "queen", title: "Queen – Greatest Hits", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 2, slug: "nirvana", title: "Nirvana – Nevermind", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 3, slug: "acdc", title: "AC/DC – Back in Black", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 4, slug: "led-zeppelin", title: "Led Zeppelin IV", img: "/assets/macMiller.jpg", price: 18.99},
    { id: 5, slug: "pink-floyd", title: "Pink Floyd – The Wall", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 6, slug: "mac-miller", title: "Mac Miller – Circles", img: "/assets/macMiller.jpg" , price: 18.99}
  ],
  jazz: [
    { id: 7, slug: "coltrane", title: "John Coltrane – Blue Train", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 8, slug: "miles", title: "Miles Davis – Kind of Blue", img: "/assets/macMiller.jpg" , price: 18.99},
    { id: 9, slug: "ella", title: "Ella Fitzgerald – Ella and Louis", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 10, slug: "bill-evans", title: "Bill Evans – Waltz for Debby", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 11, slug: "mingus", title: "Charles Mingus – Ah Um", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 12, slug: "thelonious", title: "Thelonious Monk – Brilliant Corners", img: "/assets/macMiller.jpg", price: 18.99 }
  ],
  pop: [
    { id: 13, slug: "madonna", title: "Madonna – Like a Virgin", img: "/assets/macMiller.jpg" , price: 18.99},
    { id: 14, slug: "mj", title: "Michael Jackson – Thriller", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 15, slug: "adele", title: "Adele – 21", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 16, slug: "dua-lipa", title: "Dua Lipa – Future Nostalgia", img: "/assets/macMiller.jpg" , price: 18.99},
    { id: 17, slug: "harry-styles", title: "Harry Styles – Fine Line", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 18, slug: "lady-gaga", title: "Lady Gaga – Chromatica", img: "/assets/macMiller.jpg", price: 18.99 }
  ],
  electronica: [
    { id: 19, slug: "daft-punk", title: "Daft Punk – Discovery", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 20, slug: "kraftwerk", title: "Kraftwerk – The Man-Machine", img: "/assets/macMiller.jpg" , price: 18.99},
    { id: 21, slug: "flume", title: "Flume – Skin", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 22, slug: "justice", title: "Justice – †", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 23, slug: "avicii", title: "Avicii – True", img: "/assets/macMiller.jpg" , price: 18.99},
    { id: 24, slug: "calvin-harris", title: "Calvin Harris – 18 Months", img: "/assets/macMiller.jpg", price: 18.99 }
  ],
  hiphop: [
    { id: 25, slug: "tupac", title: "2Pac – All Eyez on Me", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 26, slug: "kendrick", title: "Kendrick Lamar – DAMN.", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 27, slug: "jayz", title: "Jay-Z – The Blueprint", img: "/assets/macMiller.jpg" , price: 18.99},
    { id: 28, slug: "eminem", title: "Eminem – The Marshall Mathers LP", img: "/assets/macMiller.jpg" , price: 18.99},
    { id: 29, slug: "nas", title: "Nas – Illmatic", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 30, slug: "kanye", title: "Kanye West – Graduation", img: "/assets/macMiller.jpg", price: 18.99 }
  ],
  soul: [
    { id: 31, slug: "aretha", title: "Aretha Franklin – Lady Soul", img: "/assets/macMiller.jpg" , price: 18.99},
    { id: 32, slug: "marvin", title: "Marvin Gaye – What's Going On", img: "/assets/macMiller.jpg" , price: 18.99},
    { id: 33, slug: "al-green", title: "Al Green – Let's Stay Together", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 34, slug: "otis", title: "Otis Redding – Otis Blue", img: "/assets/macMiller.jpg" , price: 18.99},
    { id: 35, slug: "sam-cooke", title: "Sam Cooke – Ain’t That Good News", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 36, slug: "bill-withers", title: "Bill Withers – Just As I Am", img: "/assets/macMiller.jpg" , price: 18.99}
  ],
  salsa: [
    { id: 37, slug: "celia-cruz", title: "Celia Cruz – La Vida es un Carnaval", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 38, slug: "hector-lavoe", title: "Héctor Lavoe – El Cantante", img: "/assets/macMiller.jpg", price: 20.99 },
    { id: 39, slug: "ruben-blades", title: "Rubén Blades – Siembra", img: "/assets/macMiller.jpg", price: 22.99 },
    { id: 40, slug: "el-gran-combo", title: "El Gran Combo – Grandes Éxitos", img: "/assets/macMiller.jpg", price: 24.99 },
    { id: 41, slug: "fruko", title: "Fruko y sus Tesos – El Violento", img: "/assets/macMiller.jpg", price: 26.99 },
    { id: 42, slug: "willie-colon", title: "Willie Colón – El Malo", img: "/assets/macMiller.jpg", price: 28.99 }
  ],
  flamenco: [
    { id: 43, slug: "james-brown", title: "James Brown – The Payback", img: "/assets/macMiller.jpg" , price: 18.99},
    { id: 44, slug: "parliament", title: "Parliament – Mothership Connection", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 45, slug: "sly-stone", title: "Sly & The Family Stone – Stand!", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 46, slug: "rick-james", title: "Rick James – Street Songs", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 47, slug: "earth-wind", title: "Earth, Wind & Fire – That's the Way of the World", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 48, slug: "tower-of-power", title: "Tower of Power – Urban Renewal", img: "/assets/macMiller.jpg", price: 18.99 }
  ],
  indie: [
    { id: 49, slug: "arcade-fire", title: "Arcade Fire – The Suburbs", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 50, slug: "tame-impala", title: "Tame Impala – Currents", img: "/assets/macMiller.jpg" , price: 18.99},
    { id: 51, slug: "vampire-weekend", title: "Vampire Weekend – Modern Vampires", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 52, slug: "the-strokes", title: "The Strokes – Is This It", img: "/assets/macMiller.jpg", price: 18.99 },
    { id: 53, slug: "arctic-monkeys", title: "Arctic Monkeys – AM", img: "/assets/macMiller.jpg" , price: 18.99},
    { id: 54, slug: "phoenix", title: "Phoenix – Wolfgang Amadeus Phoenix", img: "/assets/macMiller.jpg" ,price: 18.99 }
  ]
  // Añade aquí los demás géneros como jazz, pop, hiphop, etc.
};

const allProducts = Object.values(mockData).flat();

export default function ProductDetail() {
  const { slug } = useParams();
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
      </div>
    );
  }

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <img src={product.img} alt={product.title} className="rounded-lg shadow-lg" />
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-lg text-gray-600 mb-4">
          Este vinilo es una edición especial para verdaderos amantes del sonido clásico. Añádelo a tu colección
          y disfruta de la experiencia sonora como se debe.
        </p>
        <p className="text-2xl font-semibold mb-6">Precio: {product.price} €</p>


        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-white hover:text-primary border border-primary transition">
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
