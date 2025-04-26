package com.paula.vinilos.ecommerce_vinilos.controller;

import com.paula.vinilos.ecommerce_vinilos.dto.ProductoRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.ProductoResponseDTO;
import com.paula.vinilos.ecommerce_vinilos.exception.ProductoNotFoundException;
import com.paula.vinilos.ecommerce_vinilos.mapper.ProductoMapper;
import com.paula.vinilos.ecommerce_vinilos.model.Producto;
import com.paula.vinilos.ecommerce_vinilos.repository.ProductoRepository;

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
    public List<ProductoResponseDTO> getAllProductos() {
        return productoRepository.findAll()
                .stream()
                .map(productoMapper::toDto)
                .collect(Collectors.toList());
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<ProductoResponseDTO> getProductoById(@PathVariable Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
        return ResponseEntity.ok(productoMapper.toDto(producto));
    }

    
    @PostMapping
    public ResponseEntity<ProductoResponseDTO> crearProducto(@Valid @RequestBody ProductoRequestDTO productoDTO) {
        Producto producto = productoMapper.toEntity(productoDTO);
        Producto nuevoProducto = productoRepository.save(producto);
        return ResponseEntity.ok(productoMapper.toDto(nuevoProducto));
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<ProductoResponseDTO> actualizarProducto(@PathVariable Long id, @Valid @RequestBody ProductoRequestDTO productoDTO) {
        Producto productoExistente = productoRepository.findById(id)
                .orElseThrow(() -> new ProductoNotFoundException(id));

        productoMapper.updateEntityFromDto(productoDTO, productoExistente);
        Producto productoActualizado = productoRepository.save(productoExistente);

        return ResponseEntity.ok(productoMapper.toDto(productoActualizado));
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        if (productoRepository.existsById(id)) {
            productoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
