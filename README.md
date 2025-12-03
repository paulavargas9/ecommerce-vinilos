# Ecommerce Vinilos

Aplicación de comercio electrónico para la venta de vinilos musicales.  
El proyecto está dividido en dos módulos principales:

- **Backend**: API REST en Java, construida con Maven.
- **Frontend**: aplicación web en JavaScript/TypeScript, ejecutada sobre Node.js.

---

## Índice

- [Descripción general](#descripción-general)
- [Arquitectura](#arquitectura)
- [Tecnologías](#tecnologías)
- [Requisitos previos](#requisitos-previos)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Puesta en marcha](#puesta-en-marcha)
  - [Clonado del repositorio](#clonado-del-repositorio)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Ejecución de tests](#ejecución-de-tests)
- [Buenas prácticas y convenciones](#buenas-prácticas-y-convenciones)
- [Autoría](#autoría)
- [Licencia](#licencia)

---

## Descripción general

El objetivo de este proyecto es implementar una tienda online de vinilos que permita:

- Consultar un catálogo de productos.
- Visualizar el detalle de cada vinilo.
- Gestionar un carrito de compra.
- Calcular el importe total del pedido.
- Consumir datos desde un backend a través de una API REST.

Este proyecto puede utilizarse como base formativa para el desarrollo de aplicaciones web full-stack.

---

## Arquitectura

La solución se organiza siguiendo una arquitectura cliente–servidor:

- **Frontend**
  - Aplicación web SPA (Single Page Application) o similar.
  - Consume la API REST del backend para obtener y enviar datos.
- **Backend**
  - Exposición de endpoints REST.
  - Gestión de lógica de negocio relacionada con el catálogo de vinilos y las operaciones del carrito.
  - Construcción y gestión de dependencias mediante Maven (mvnw / mvnw.cmd incluidos en el repositorio).

---

## Tecnologías

### Frontend

- JavaScript / TypeScript.
- Node.js (gestor de paquetes **npm**).
- Framework o librería para el desarrollo de interfaces (por ejemplo, React, Vite, etc., según la configuración del proyecto).
- HTML5 y CSS3.

### Backend

- Java.
- Maven (uso de `mvnw` y `mvnw.cmd` para una versión controlada de Maven).
- Servidor de aplicaciones embebido (por ejemplo, Tomcat, según el tipo de proyecto configurado).

### Otras herramientas

- Git y GitHub para control de versiones.
- IDE o editor recomendado: VS Code, IntelliJ IDEA, etc.

---

## Requisitos previos

Para poder compilar y ejecutar el proyecto localmente es necesario tener instalado:

- **Java JDK** (versión compatible con la configurada en el backend).
- **Node.js** (incluye npm).
- **Git**.

Opcionalmente:

- Un IDE para Java.
- Un editor de código para el frontend (por ejemplo, VS Code).

---

## Estructura del proyecto

```bash
ecommerce-vinilos/
├── backend/              # Código del backend (API REST, lógica de negocio)
│   ├── src/
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
├── frontend/             # Código del frontend (aplicación cliente)
│   ├── src/
│   ├── package.json
│   └── ...
├── README.md
└── .gitignore
