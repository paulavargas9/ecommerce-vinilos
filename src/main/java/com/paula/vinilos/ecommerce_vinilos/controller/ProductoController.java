package com.paula.vinilos.ecommerce_vinilos.controller;

import com.paula.vinilos.ecommerce_vinilos.dto.ProductoRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.ProductoResponseDTO;
import com.paula.vinilos.ecommerce_vinilos.exception.ProductoNotFoundException;
import com.paula.vinilos.ecommerce_vinilos.mapper.ProductoMapper;
import com.paula.vinilos.ecommerce_vinilos.model.Producto;
import com.paula.vinilos.ecommerce_vinilos.repository.ProductoRepository;
import com.paula.vinilos.ecommerce_vinilos.response.ApiResponse;
import com.paula.vinilos.ecommerce_vinilos.response.ResponseBuilder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private ProductoMapper productoMapper;

    
    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductoResponseDTO>>> getAllProductos() {
        List<ProductoResponseDTO> productos = productoRepository.findAll()
                .stream()
                .map(productoMapper::toDto)
                .collect(Collectors.toList());
        return ResponseBuilder.ok("Lista de productos obtenida correctamente", productos);
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductoResponseDTO>> getProductoById(@PathVariable Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ProductoNotFoundException(id));
        return ResponseBuilder.ok("Producto encontrado", productoMapper.toDto(producto));
    }

    
    @PostMapping
    public ResponseEntity<ApiResponse<ProductoResponseDTO>> crearProducto(@Valid @RequestBody ProductoRequestDTO productoDTO) {
        Producto producto = productoMapper.toEntity(productoDTO);
        Producto nuevoProducto = productoRepository.save(producto);
        return ResponseBuilder.created("Producto creado correctamente", productoMapper.toDto(nuevoProducto));
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductoResponseDTO>> actualizarProducto(@PathVariable Long id, @Valid @RequestBody ProductoRequestDTO productoDTO) {
        Producto productoExistente = productoRepository.findById(id)
                .orElseThrow(() -> new ProductoNotFoundException(id));

        productoMapper.updateEntityFromDto(productoDTO, productoExistente);
        Producto productoActualizado = productoRepository.save(productoExistente);

        return ResponseBuilder.ok("Producto actualizado correctamente", productoMapper.toDto(productoActualizado));
    }

   
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> eliminarProducto(@PathVariable Long id) {
        if (productoRepository.existsById(id)) {
            productoRepository.deleteById(id);
            return ResponseBuilder.deleted("Producto eliminado correctamente");
        }
        throw new ProductoNotFoundException(id);
    }
}
