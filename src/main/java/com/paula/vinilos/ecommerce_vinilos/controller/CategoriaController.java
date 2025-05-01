package com.paula.vinilos.ecommerce_vinilos.controller;

import com.paula.vinilos.ecommerce_vinilos.dto.CategoriaRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.CategoriaResponseDTO;
import com.paula.vinilos.ecommerce_vinilos.response.ApiResponse;
import com.paula.vinilos.ecommerce_vinilos.response.ResponseBuilder;
import com.paula.vinilos.ecommerce_vinilos.service.ICategoriaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {

    @Autowired
    private ICategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoriaResponseDTO>>> getAllCategorias() {
        List<CategoriaResponseDTO> categorias = categoriaService.getAllCategorias();
        return ResponseBuilder.ok("Lista de categorías obtenida correctamente", categorias);
    }

      @GetMapping("/page")
      public ResponseEntity<ApiResponse<Page<CategoriaResponseDTO>>> getCategoriasPaginadas(Pageable pageable) {
          Page<CategoriaResponseDTO> pagina = categoriaService.getCategoriasPaginadas(pageable);
          return ResponseBuilder.ok("Página de categorías obtenida correctamente", pagina);
      }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoriaResponseDTO>> getCategoriaById(@PathVariable Long id) {
        CategoriaResponseDTO categoria = categoriaService.getCategoriaById(id);
        return ResponseBuilder.ok("Categoría encontrada", categoria);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CategoriaResponseDTO>> crearCategoria(@Valid @RequestBody CategoriaRequestDTO categoriaDTO) {
        CategoriaResponseDTO nuevaCategoria = categoriaService.crearCategoria(categoriaDTO);
        return ResponseBuilder.created("Categoría creada correctamente", nuevaCategoria);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoriaResponseDTO>> actualizarCategoria(@PathVariable Long id, @Valid @RequestBody CategoriaRequestDTO categoriaDTO) {
        CategoriaResponseDTO actualizada = categoriaService.actualizarCategoria(id, categoriaDTO);
        return ResponseBuilder.ok("Categoría actualizada correctamente", actualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> eliminarCategoria(@PathVariable Long id) {
        categoriaService.eliminarCategoria(id);
        return ResponseBuilder.noContent("Categoría eliminada correctamente");
    }
}
