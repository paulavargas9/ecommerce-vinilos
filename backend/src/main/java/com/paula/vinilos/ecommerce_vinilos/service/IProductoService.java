package com.paula.vinilos.ecommerce_vinilos.service;

import com.paula.vinilos.ecommerce_vinilos.dto.ProductoRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.ProductoResponseDTO;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IProductoService {
    List<ProductoResponseDTO> getAllProductos();
    ProductoResponseDTO getProductoById(Long id);
    ProductoResponseDTO crearProducto(ProductoRequestDTO dto);
    ProductoResponseDTO actualizarProducto(Long id, ProductoRequestDTO dto);
    Page<ProductoResponseDTO> getProductosPaginados(Pageable pageable);
    void eliminarProducto(Long id);
}
