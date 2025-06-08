-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 08-06-2025 a las 21:36:36
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda_vinilos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` bigint(20) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `descripcion`, `nombre`, `slug`) VALUES
(1, 'Vinilos clásicos de rock', 'rock', 'rock'),
(2, 'Explora joyas del jazz, desde clásicos hasta sonidos underground', 'jazz', 'jazz'),
(3, 'Grandes estrellas del pop y artistas emergentes con estilo', 'pop', 'pop'),
(4, 'Ritmos electrónicos underground y techno vibrante', 'electronica', 'electronica'),
(5, 'Desde leyendas del rap hasta el hip-hop más experimental', 'hiphop-rap', 'hiphop-rap'),
(6, 'R&B suave, soul profundo y artistas con alma', 'soul-rnb', 'soul-rnb'),
(7, 'Sabor latino con ritmos bailables y clásicos de la salsa', 'salsa', 'salsa'),
(8, 'Pasión, raíces y fusiones del flamenco contemporáneo', 'flamenco', 'flamenco'),
(9, 'Propuestas independientes, sonidos alternativos y nuevas joyas', 'indie-alternativo', 'indie-alternativo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_pedido`
--

CREATE TABLE `detalles_pedido` (
  `id` bigint(20) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `pedido_id` bigint(20) DEFAULT NULL,
  `producto_id` bigint(20) DEFAULT NULL,
  `precio_unitario` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalles_pedido`
--

INSERT INTO `detalles_pedido` (`id`, `cantidad`, `precio`, `pedido_id`, `producto_id`, `precio_unitario`) VALUES
(10, 1, NULL, 11, 7, 0),
(11, 1, NULL, 11, 15, 0),
(12, 1, NULL, 12, 8, 0),
(13, 5, NULL, 13, 8, 0),
(14, 1, NULL, 14, 11, 0),
(15, 1, NULL, 15, 7, 24.9),
(16, 1, NULL, 18, 50, 28.5),
(17, 1, NULL, 19, 50, 28.5),
(18, 1, NULL, 21, 12, 24.75),
(19, 2, NULL, 22, 20, 26.5),
(20, 1, NULL, 23, 44, 30),
(21, 1, NULL, 24, 9, 21.99),
(22, 1, NULL, 25, 38, 24.99),
(23, 1, NULL, 25, 26, 24.5),
(24, 2, NULL, 26, 8, 27.5),
(25, 2, NULL, 27, 8, 27.5),
(26, 1, NULL, 28, 44, 25),
(27, 1, NULL, 29, 25, 27.99),
(28, 1, NULL, 29, 53, 29);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` bigint(20) NOT NULL,
  `fecha` datetime(6) DEFAULT NULL,
  `total` double DEFAULT NULL,
  `usuario_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `fecha`, `total`, `usuario_id`) VALUES
(9, '2025-05-21 01:04:05.000000', 21.979999999999997, 3),
(10, '2025-05-24 13:01:47.000000', 21.979999999999997, 3),
(11, '2025-05-25 18:31:44.000000', 55.39, 3),
(12, '2025-05-25 19:46:20.000000', 30.490000000000002, 3),
(13, '2025-05-27 23:45:44.000000', 140.49, 3),
(14, '2025-05-27 23:51:00.000000', 25.979999999999997, 3),
(15, '2025-05-28 16:35:37.000000', 27.89, 3),
(18, '2025-05-28 17:44:07.000000', 31.490000000000002, 3),
(19, '2025-05-28 17:44:08.000000', 31.490000000000002, 3),
(21, '2025-05-28 19:07:33.000000', 27.740000000000002, 3),
(22, '2025-05-28 19:18:27.000000', 55.99, 3),
(23, '2025-05-28 19:19:14.000000', 32.99, 3),
(24, '2025-05-28 19:55:59.000000', 24.979999999999997, 3),
(25, '2025-05-31 19:31:18.000000', 52.48, 3),
(26, '2025-06-01 04:24:32.000000', 57.99, 7),
(27, '2025-06-01 05:12:29.000000', 57.99, 7),
(28, '2025-06-07 19:42:34.000000', 27.990000000000002, 8),
(29, '2025-06-07 20:06:19.000000', 59.98, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` bigint(20) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `precio` double NOT NULL,
  `stock` int(11) NOT NULL,
  `categoria_id` bigint(20) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `descripcion`, `nombre`, `slug`, `precio`, `stock`, `categoria_id`, `img`) VALUES
(1, 'Vinilo clásico del heavy metal', 'Black Sabbath – Paranoid', 'black-sabbath-–-paranoid', 27.99, 20, 1, '/assets/black-sabbath-paranoid.webp'),
(2, 'Álbum legendario de Pink Floyd', 'Pink Floyd – The Dark Side of the Moon', 'pink-floyd-–-the-dark-side-of-the-moon', 28.5, 18, 1, '/assets/pink-floyd-dark-side-of-the-moon.webp'),
(3, 'Folk rock con contenido político', 'Bob Dylan – The Freewheelin\' Bob Dylan', 'bob-dylan-–-the-freewheelin\'-bob-dylan', 23.99, 15, 1, '/assets/bob-dylan-freewheelin-bob-dylan.webp'),
(4, 'Rock alternativo de los 90', 'Radiohead – The Bends', 'radiohead-–-the-bends', 25.5, 16, 1, '/assets/radiohead-the-bends.webp'),
(5, 'Clásico del rock británico', 'Dire Straits – Brothers In Arms', 'dire-straits-–-brothers-in-arms', 26, 12, 1, '/assets/dire-straits-brothers-in-arms.webp'),
(6, 'Rock español alternativo', 'Extremoduro – Material Defectuoso', 'extremoduro-–-material-defectuoso', 29.15, 10, 1, '/assets/extremoduro-material-defectuoso.webp'),
(7, 'Jazz experimental y electrónico moderno', '72-HOUR POST FIGHT – NON-BACKGROUND MUSIC', '72hpf—non-background-music', 21.99, 12, 2, '/assets/72-HOUR-POST-FIGHT-NON-BACKGROUND-MUSIC.webp'),
(8, 'Jazz espiritual y vanguardista', 'Azar Lawrence – Bridge Into The New Age', 'azar-lawrence—bridge-into-the-new-age', 24.5, 10, 2, '/assets/Azar-Lawrence-Bridge-Into-The-New-Age.webp'),
(9, 'Fusión brasileña-jazz con toques latinos', 'Friends From Rio – Project 2014', 'friends-from-rio—project-2014', 22.5, 13, 2, '/assets/Friends-From-Rio-Friends-From-Rio-Project-2014-.webp'),
(10, 'Selección bailable de jazz underground', 'Various Artists – Jazz Dance Fusion', 'various-artists—jazz-dance-fusion', 23.99, 14, 2, '/assets/Various-artist-curtis-presents-Jazz-Dance-Fusion.webp'),
(11, 'Piano jazz latino con arreglos orquestales', 'Carlos Franzetti – GRAFITTI', 'carlos-franzetti—grafitti', 20.5, 11, 2, '/assets/Carlos-Franzetti-GRAFITTI-.webp'),
(12, 'Jazzbeat electrónico con sabor clásico', 'Cruisic – Pacific 707 (Jazzbeat Version)', 'cruisic—pacific-707-jazzbeat-version', 24.99, 9, 2, '/assets/Jazz-Carnival_Pacific-707_-Cruisic-Pacific-707-_Jazzbeat-Version_-.webp'),
(13, 'Álbum debut que marcó el pop de los 90s', 'Britney Spears – ...Baby One More Time', 'britney-spears-–-...baby-one-more-time', 22.99, 20, 3, '/assets/BritneySpears-BabyOneMoreTime.webp'),
(14, 'El álbum más vendido de todos los tiempos', 'Michael Jackson – Thriller', 'michael-jackson-–-thriller', 28.99, 25, 3, '/assets/michael-jackson-thriller.webp'),
(15, 'Banda sonora icónica con estilo único', 'Prince And The Revolution – Purple Rain', 'prince-and-the-revolution-–-purple-rain', 27.5, 17, 3, '/assets/prince-purple-rain.webp'),
(16, 'Pop urbano alternativo español', 'Rusowsky – DAISY', 'rusowsky-–-daisy', 19.9, 15, 3, '/assets/rusowsky-daisy.webp'),
(17, 'Álbum audaz y emocional de Rihanna que combina pop, R&B y electrónica, con temas de empoderamiento, vulnerabilidad y amor. Incluye éxitos como \"Diamonds\" y \"Stay\".', 'Rihanna – Unapologetic', 'rihanna—unapologetic', 23.99, 12, 3, '/assets/rihanna-unapologetic.webp'),
(18, 'Electropop experimental con energía vibrante', 'Charli XCX – Brat', 'charli-xcx-–-brat', 24.5, 10, 3, '/assets/charli-xcx-brat-black-ice-vinyl-edition.webp'),
(19, 'Tecno británico contundente y directo', 'Ben Sims – Raw Mixes Vol.1', 'ben-sims-–-raw-mixes-vol.1', 23.99, 15, 4, '/assets/The-Remixes-Pt-Samuel-L-Session_-Ben-Sims_-Mark-Broom.webp'),
(20, 'EP atmosférico del productor español, donde el techno se funde con texturas minimalistas y tensión ambiental.', 'Oscar Mulero – Sans Souci EP', 'oscar-mulero—sans-souci-ep', 26.5, 8, 4, '/assets/oscar-mulero-sans-souci-EP.webp'),
(21, 'Segunda entrega del colectivo RAPRAVE, combinando rap futurista con bases electrónicas y breakbeat agresivo.', 'RAPRAVE presents hyper/link Vol. 2', 'raprave—hyperlink-vol-2', 21, 12, 4, '/assets/RAPRAVE-RAPRAVE-presents-hyper_link-Vol.-2-.webp'),
(22, 'Hard techno emocional con narrativa', 'Héctor Oaks – As We Were Saying', 'héctor-oaks-–-as-we-were-saying', 25.99, 14, 4, '/assets/hector-oaks-as-we-are-saying.webp'),
(23, 'Un viaje hipnótico por el techno de Detroit.', 'Jeff Mills - Kat Moda EP', 'jeff-mills---kat-moda-ep', 22, 20, 4, '/assets/jeff-mills-kat-moda-EP.webp'),
(24, 'Debut de KE-YEN que mezcla electrónica abstracta, glitch-hop y ritmos urbanos en una producción hipervibrante.', 'KE-YEN – IN CHECK', 'ke-yen—in-check', 27.5, 10, 4, '/assets/KE-YEN-IN-CHECK.webp'),
(25, 'Obra maestra del soul y hip-hop con letras profundas y producción clásica.', 'Lauryn Hill – The Miseducation of Lauryn Hill', 'lauryn-hill-–-the-miseducation-of-lauryn-hill', 27.99, 11, 5, '/assets/lauryn-hill-the-miseducation-of-lauryn-hill.webp'),
(26, 'Álbum debut de Snoop Dogg, producido por Dr. Dre. Un clásico del G-Funk.', 'Snoop Dogg – Doggystyle', 'snoop-dogg-–-doggystyle', 24.5, 9, 5, '/assets/snoop-dogg-doggystyle-kit-album.webp'),
(27, 'Álbum conceptual de 2012 que narra la vida de Kendrick en Compton, mezclando rap narrativo con beats minimalistas. Incluye “Swimming Pools” y “Bitch, Don’t Kill My Vibe”.', 'Kendrick Lamar – good kid, m.A.A.d city', 'kendrick-lamar—good-kid-maad-city', 26.9, 8, 5, '/assets/kendrick-lamar-good-kid-m-a-a-d-city-10th-anniversary-black-vinyl-edition.webp'),
(28, 'Considerado uno de los mejores discos de rap de todos los tiempos. Lírico y poderoso.', 'Nas – Illmatic', 'nas-–-illmatic', 28, 14, 5, '/assets/nas-illmatic-black-vinyl-edition.webp'),
(29, 'Debut de A$AP Rocky lanzado en 2013. Mezcla trap, rap de Houston y colaboraciones de alto nivel como Kendrick Lamar, Drake y Skrillex. Incluye “Goldie” y “F**kin\' Problems”.', 'A$AP Rocky – Long.Live.A$AP', 'asap-rocky—long-live-asap', 25.75, 9, 5, '/assets/-a-ap-rocky-long-live-a-ap-orange-vinyl-edition.webp'),
(30, 'Pilar del sonido G-Funk, producción impecable y base del éxito de la costa oeste.', 'Dr. Dre – The Chronic', 'dr.-dre-–-the-chronic', 29.99, 11, 5, '/assets/dr-dre-the-chronic.webp'),
(31, 'Una mezcla introspectiva de soul, jazz y rap, con letras melancólicas y una producción envolvente.', 'Mac Miller – Circles', 'mac-miller-–-circles', 27.9, 10, 6, NULL),
(32, 'Fusión de electrónica, hip-hop y R&B con ritmos bailables y frescos.', 'Kaytranada – 99.9%', 'kaytranada-–-99.9%', 24.99, 8, 6, NULL),
(33, 'Un viaje sonoro que mezcla R&B, soul y pop con un estilo único y elegante.', 'Kali Uchis – Sincerely', 'kali-uchis-–-sincerely', 25.99, 12, 6, NULL),
(34, 'Disco esencial del neo-soul con letras conscientes y ritmos suaves.', 'Erykah Badu – Baduizm', 'erykah-badu-–-baduizm', 28.5, 7, 6, NULL),
(35, 'R&B moderno con letras vulnerables y sonidos atmosféricos.', 'SZA – Open Arms', 'sza-–-open-arms', 26, 11, 6, NULL),
(36, 'Innovador y emocional, mezcla de soul, funk y electrónica con narrativa romántica.', 'Tyler, The Creator – IGOR', 'tyler-the-creator-–-igor', 29, 10, 6, NULL),
(37, 'Álbum clásico de salsa dura con influencia del jazz latino y la calle neoyorquina.', 'Willie Colón – Hustler', 'willie-colon—hustler', 23.99, 10, 7, '/assets/willie-colon-hustler.webp'),
(38, 'Revento captura la voz poderosa de Lavoe en una colección de clásicos vibrantes.', 'Héctor Lavoe – Revento', 'hector-lavoe—revento', 24.99, 8, 7, '/assets/hector-lavoe-revento.webp'),
(39, 'Celia en su esencia afrocubana, con ritmos de guaguancó y letras contundentes.', 'Celia Cruz – Son Con Guaguancó (Vinilo)', 'celia-cruz—son-con-guaguanco', 27.5, 6, 7, '/assets/Celia-Cruz-Son-Con-Guaguanco.webp'),
(40, 'Compilación de grandes intérpretes de salsa de distintas épocas y estilos.', 'V.A. – Trace Salsa', 'va—trace-salsa', 26, 8, 7, '/assets/1-v-a-trace-salsa.webp'),
(41, 'Uno de los discos más influyentes de la salsa consciente y narrativa.', 'Willie Colón & Rubén Blades – Siembra', 'colon-blades—siembra', 25, 12, 7, '/assets/siembra.webp'),
(42, 'Salsa puertorriqueña clásica en estado puro, con arreglos y ritmo impecables.', 'El Gran Combo – La Universidad de la Salsa', 'gran-combo—universidad-de-la-salsa', 22.5, 10, 7, '/assets/gran-combo-puerto-rico.webp'),
(43, 'Una colección instrumental donde confluyen los talentos de Antoine Tato Garcia, Steeve Laffont, Juan Luis Curbon, Nas Heredia y Ramón del Pichón. Flamenco moderno con alma gitana y maestría en las cuerdas.', 'Mediterranean Gypsies Roads – The Sound of Guitars', 'mediterranean-gypsies-roads—the-sound-of-guitars', 24, 8, 8, '/assets/mediterranean.webp'),
(44, 'El debut esencial del grupo gitano que definió la rumba callejera y el flamenco urbano. Ritmos pegajosos y letras crudas de la España de los 80.', 'Los Chunguitos – Los Chunguitos', 'los-chunguitos—los-chunguitos', 25, 5, 8, '/assets/los-chunguitos.webp'),
(45, 'Dellafuente fusiona flamenco contemporáneo con sonido urbano y melancolía digital. “Azulejos De Corales” es una obra íntima, vibrante y espiritual.', 'Dellafuente – Azulejos De Corales', 'dellafuente—azulejos-de-corales', 26.5, 5, 8, '/assets/dellafuente-azulejos-de-corales.webp'),
(46, 'Minimalismo y voz cruda en homenaje al cante jondo.', 'Rosalía – Los Ángeles', 'rosalía-–-los-ángeles', 24.99, 9, 8, '/assets/rosalia-los-angeles.webp'),
(47, 'Un viaje musical innovador que fusiona flamenco, jazz y experimentación sonora. Juanfe Pérez redefine los límites del toque flamenco en este vinilo imprescindible.', 'Juanfe Pérez – Prohibido el Toque', 'juanfe-perez—prohibido-el-toque', 25.5, 6, 8, '/assets/juanfe-perez-prohibido-el-toque.webp'),
(48, 'Recopilatorio esencial del cantaor más internacional. Una edición dorada en vinilo que resume lo mejor de su trayectoria con sabor, emoción y grandeza.', 'Diego El Cigala – Obras Maestras (Gold Edition)', 'diego-el-cigala—obras-maestras-gold-edition', 22, 10, 8, '/assets/diego-el-cigala-obras-maestras-gold-colored-vinyl-edtion.webp'),
(49, 'Un álbum directo y crudo que retrata con frescura la juventud española.', 'Carolina Durante – Elige Tu Propia Aventura', 'carolina-durante-–-cuatro-chavales', 26.5, 11, 9, '/assets/carolina-durante-elige-tu-propia-aventura.webp'),
(50, 'Psicodelia moderna y electrónica con un sonido introspectivo y fresco.', 'Tame Impala – Currents', 'tame-impala-–-currents', 28.5, 9, 9, '/assets/tame-impala-currents.webp'),
(51, 'Fusión de electrónica suave y pop alternativo, con letras íntimas.', 'Caribou – Our Love', 'caribou-–-our-love', 26.99, 9, 9, '/assets/caribou-our-love.webp'),
(52, 'Dream pop etéreo con atmósfera melancólica y envolvente.', 'Los De Abajo – El Simpático Vacilón', 'beach-house-–-teen-dream', 25.99, 8, 9, '/assets/el-simpatico-vacilon-los-de-abajo.jpg'),
(53, 'Propuesta vanguardista que mezcla flamenco, reggaetón y electrónica.', 'Rosalía – Motomami', 'rosalía-–-motomami', 29, 5, 9, '/assets/rosalia-motomami-red-vinyl-edition.webp'),
(54, 'Indie alternativo con toques electrónicos y estructuras inusuales.', 'Alt-J – An Awesome Wave', 'alt-j-–-an-awesome-wave', 24.99, 10, 9, '/assets/alt-j-an-awesome-wave.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nombre` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `nombre`, `password`, `rol`) VALUES
(3, 'react@demo.com', 'Paula React', '$2a$10$25J8yru6gYa1Cd/dINIKh.vVxu4HhulS0msE/RKTRUUWxyyfQt.Fe', 'ADMIN'),
(4, 'paulavargasilva09@gmail.com', 'paula', '$2a$10$.Tn5sHmNDYUl7hRKCcJu6ey9lbTVwfJq7SEIX7nmDGn1yJCfhmXUe', 'USER'),
(5, 'pablosilva@gmail.com', 'pablo', '$2a$10$tAZPIA357Z4ZIFRjMJ.ysedOScXVIOuhkSWoAHZj/ALgYaARZ01BK', 'USER'),
(6, 'paula@example.com', 'paula vargas', '$2a$10$7C/kV4bRBMhBbSfWxA24OuWvhDzZTrrb36xR0./KCEu7hBG/fnMeu', 'USER'),
(7, 'admin@lamediscos.com', 'Admin Paula', '$2a$10$gi/9hySAMT4KAiWti/C4LeDbsfHsZjm1NMvUHSVhodZ9xixAxPgZe', 'ADMIN'),
(8, 'laura@hotmail.com', 'laura', '$2a$10$RPqkB7q9bnqGaquxGG8fGuLuFOA7glQvCuttmjyd0IP1m0MCvDS5C', 'USER');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalles_pedido`
--
ALTER TABLE `detalles_pedido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK4qmqlxyy78kjl4ec4wjnfmggu` (`pedido_id`),
  ADD KEY `FK8144uqs26ce7usdnqb1aml16` (`producto_id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK5g0es69v35nmkmpi8uewbphs2` (`usuario_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `FK2fwq10nwymfv7fumctxt9vpgb` (`categoria_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKkfsp0s1tflm1cwlj8idhqsad0` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `detalles_pedido`
--
ALTER TABLE `detalles_pedido`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalles_pedido`
--
ALTER TABLE `detalles_pedido`
  ADD CONSTRAINT `FK4qmqlxyy78kjl4ec4wjnfmggu` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`),
  ADD CONSTRAINT `FK8144uqs26ce7usdnqb1aml16` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `FK5g0es69v35nmkmpi8uewbphs2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `FK2fwq10nwymfv7fumctxt9vpgb` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
