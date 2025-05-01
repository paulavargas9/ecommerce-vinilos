package com.paula.vinilos.ecommerce_vinilos.controller;

import com.paula.vinilos.ecommerce_vinilos.dto.ProductoRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.ProductoResponseDTO;
import com.paula.vinilos.ecommerce_vinilos.response.ApiResponse;
import com.paula.vinilos.ecommerce_vinilos.response.ResponseBuilder;
import com.paula.vinilos.ecommerce_vinilos.service.IProductoService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    @Autowired
    private IProductoService productoService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductoResponseDTO>>> getAllProductos() {
        List<ProductoResponseDTO> productos = productoService.getAllProductos();
        return ResponseBuilder.ok("Lista de productos obtenida correctamente", productos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductoResponseDTO>> getProductoById(@PathVariable Long id) {
        ProductoResponseDTO producto = productoService.getProductoById(id);
        return ResponseBuilder.ok("Producto encontrado", producto);
    }

    @GetMapping("/page")
    public ResponseEntity<ApiResponse<Page<ProductoResponseDTO>>> getProductosPaginados(Pageable pageable) {
            Page<ProductoResponseDTO> pagina = productoService.getProductosPaginados(pageable);
            return ResponseBuilder.ok("Página de productos obtenida correctamente", pagina);
        }

    @PostMapping
    public ResponseEntity<ApiResponse<ProductoResponseDTO>> crearProducto(@Valid @RequestBody ProductoRequestDTO productoDTO) {
        ProductoResponseDTO nuevoProducto = productoService.crearProducto(productoDTO);
        return ResponseBuilder.created("Producto creado correctamente", nuevoProducto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductoResponseDTO>> actualizarProducto(@PathVariable Long id, @Valid @RequestBody ProductoRequestDTO productoDTO) {
        ProductoResponseDTO actualizado = productoService.actualizarProducto(id, productoDTO);
        return ResponseBuilder.ok("Producto actualizado correctamente", actualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> eliminarProducto(@PathVariable Long id) {
        productoService.eliminarProducto(id);
        return ResponseBuilder.noContent("Producto eliminado correctamente");
    }
    
}
