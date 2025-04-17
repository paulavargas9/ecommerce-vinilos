package com.paula.vinilos.ecommerce_vinilos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.paula.vinilos.ecommerce_vinilos.model.Categoria;
import com.paula.vinilos.ecommerce_vinilos.repository.CategoriaRepository;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    // Obtener todas las categorías 
    @GetMapping
    public List<Categoria> getAllCategorias() {
        return categoriaRepository.findAll();
    }

    // GET: obtener una categoría por ID
    @GetMapping("/api/categorias/{id}")
    public ResponseEntity<Categoria> obtenerCategoriaPorId(@PathVariable Long id) {
        return categoriaRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

            // POST: crear una nueva categoría
        @PostMapping("/api/categorias")
        public Categoria crearCategoria(@RequestBody Categoria categoria) {
            return categoriaRepository.save(categoria);
        }

        // PUT: editar una categoría
        @PutMapping("/api/categorias/{id}")
        public ResponseEntity<Categoria> actualizarCategoria(@PathVariable Long id, @RequestBody Categoria nuevaCategoria) {
            return categoriaRepository.findById(id)
                .map(categoriaExistente -> {
                    categoriaExistente.setNombre(nuevaCategoria.getNombre());
                    categoriaExistente.setDescripcion(nuevaCategoria.getDescripcion());
                    return ResponseEntity.ok(categoriaRepository.save(categoriaExistente));
                }).orElse(ResponseEntity.notFound().build());
        }

        // DELETE: eliminar una categoría
        @DeleteMapping("/api/categorias/{id}")
        public ResponseEntity<Void> eliminarCategoria(@PathVariable Long id) {
            if (categoriaRepository.existsById(id)) {
                categoriaRepository.deleteById(id);
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.notFound().build();
        }


}
