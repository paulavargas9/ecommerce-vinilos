package com.paula.vinilos.ecommerce_vinilos.service;

import com.paula.vinilos.ecommerce_vinilos.dto.CategoriaRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.CategoriaResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICategoriaService {
    List<CategoriaResponseDTO> getAllCategorias();
    CategoriaResponseDTO getCategoriaById(Long id);
    CategoriaResponseDTO crearCategoria(CategoriaRequestDTO dto);
    CategoriaResponseDTO actualizarCategoria(Long id, CategoriaRequestDTO dto);
    void eliminarCategoria(Long id);
    Page<CategoriaResponseDTO> getCategoriasPaginadas(Pageable pageable);  // Método de paginación
}
