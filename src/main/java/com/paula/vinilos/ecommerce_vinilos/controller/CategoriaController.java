package com.paula.vinilos.ecommerce_vinilos.controller;

import com.paula.vinilos.ecommerce_vinilos.dto.CategoriaRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.CategoriaResponseDTO;
import com.paula.vinilos.ecommerce_vinilos.exception.CategoriaNotFoundException;
import com.paula.vinilos.ecommerce_vinilos.mapper.CategoriaMapper;
import com.paula.vinilos.ecommerce_vinilos.model.Categoria;
import com.paula.vinilos.ecommerce_vinilos.repository.CategoriaRepository;
import com.paula.vinilos.ecommerce_vinilos.response.ApiResponse;
import com.paula.vinilos.ecommerce_vinilos.response.ResponseBuilder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private CategoriaMapper categoriaMapper;

    
    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoriaResponseDTO>>> getAllCategorias() {
        List<CategoriaResponseDTO> categorias = categoriaRepository.findAll()
                .stream()
                .map(categoriaMapper::toDto)
                .collect(Collectors.toList());
        return ResponseBuilder.ok("Lista de categorías obtenida correctamente", categorias);
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoriaResponseDTO>> getCategoriaById(@PathVariable Long id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new CategoriaNotFoundException(id));
        return ResponseBuilder.ok("Categoría encontrada", categoriaMapper.toDto(categoria));
    }

    
    @PostMapping
    public ResponseEntity<ApiResponse<CategoriaResponseDTO>> crearCategoria(@Valid @RequestBody CategoriaRequestDTO categoriaDTO) {
        Categoria categoria = categoriaMapper.toEntity(categoriaDTO);
        Categoria nuevaCategoria = categoriaRepository.save(categoria);
        return ResponseBuilder.created("Categoría creada correctamente", categoriaMapper.toDto(nuevaCategoria));
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoriaResponseDTO>> actualizarCategoria(@PathVariable Long id, @Valid @RequestBody CategoriaRequestDTO categoriaDTO) {
        Categoria categoriaExistente = categoriaRepository.findById(id)
                .orElseThrow(() -> new CategoriaNotFoundException(id));

        categoriaMapper.updateEntityFromDto(categoriaDTO, categoriaExistente);
        Categoria categoriaActualizada = categoriaRepository.save(categoriaExistente);

        return ResponseBuilder.ok("Categoría actualizada correctamente", categoriaMapper.toDto(categoriaActualizada));
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> eliminarCategoria(@PathVariable Long id) {
        if (categoriaRepository.existsById(id)) {
            categoriaRepository.deleteById(id);
            return ResponseBuilder.deleted("Categoría eliminada correctamente");
        }
        throw new CategoriaNotFoundException(id);
    }
}
