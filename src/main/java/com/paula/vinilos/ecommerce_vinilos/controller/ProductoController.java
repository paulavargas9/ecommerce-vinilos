package com.paula.vinilos.ecommerce_vinilos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.paula.vinilos.ecommerce_vinilos.model.Producto;
import com.paula.vinilos.ecommerce_vinilos.repository.ProductoRepository;

@CrossOrigin(origins = "*") // esto permite llamadas desde cualquier origen
@RestController
@RequestMapping("/api/productos")

public class ProductoController {

     @Autowired
    private ProductoRepository productoRepository;

    // Obtener todos los productos
    @GetMapping
    public List<Producto> getAllProductos() {
        return productoRepository.findAll();
    }

    //  Obtener un producto por ID
        @GetMapping("/{id}")
        public Producto getProductoById(@PathVariable Long id) {
            return productoRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
            }

    // Crear un nuevo producto
        @PostMapping
        public Producto crearProducto(@RequestBody Producto producto) {
            return productoRepository.save(producto);
        }

    // Actualizar un producto existente
        @PutMapping("/{id}")
        public Producto actualizarProducto(@PathVariable Long id, @RequestBody Producto productoActualizado) {
            return productoRepository.findById(id).map(producto -> {
                producto.setNombre(productoActualizado.getNombre());
                producto.setDescripcion(productoActualizado.getDescripcion());
                producto.setPrecio(productoActualizado.getPrecio());
                producto.setStock(productoActualizado.getStock());
                producto.setCategoria(productoActualizado.getCategoria());
                return productoRepository.save(producto);
            }).orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
        }

    //  Eliminar un producto por ID
        @DeleteMapping("/{id}")
        public void eliminarProducto(@PathVariable Long id) {
            productoRepository.deleteById(id);
        }

}
