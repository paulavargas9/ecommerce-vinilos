package com.paula.vinilos.ecommerce_vinilos.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.paula.vinilos.ecommerce_vinilos.dto.ProductoRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.ProductoResponseDTO;
import com.paula.vinilos.ecommerce_vinilos.model.Categoria;
import com.paula.vinilos.ecommerce_vinilos.model.Producto;
import com.paula.vinilos.ecommerce_vinilos.repository.CategoriaRepository;

@Component
public class ProductoMapper {

    private final CategoriaRepository categoriaRepository;

    @Autowired
    public ProductoMapper(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    
    public ProductoResponseDTO toDto(Producto producto) {
        ProductoResponseDTO dto = new ProductoResponseDTO();
        dto.setId(producto.getId());
        dto.setNombre(producto.getNombre());
        dto.setDescripcion(producto.getDescripcion());
        dto.setPrecio(producto.getPrecio());
        dto.setStock(producto.getStock());
        dto.setCategoriaId(producto.getCategoria().getId());
        dto.setSlug(producto.getSlug());
        dto.setSlug(producto.getSlug());



        // 👇 Añade el nombre de la categoría
        dto.setCategoriaNombre(producto.getCategoria().getNombre());
        dto.setCategoriaSlug(producto.getCategoria().getSlug());

        return dto;
    }

    
    public Producto toEntity(ProductoRequestDTO dto) {
        Producto producto = new Producto();
        producto.setNombre(dto.getNombre());
        producto.setDescripcion(dto.getDescripcion());
        producto.setPrecio(dto.getPrecio());
        producto.setStock(dto.getStock());
    
        // Generar slug a partir del nombre
        String slug = dto.getNombre()
            .toLowerCase()
            .replace(" ", "-")
            .replaceAll("[^a-z0-9\\-]", "");
        producto.setSlug(slug);
    
        // Asignar la categoría si se recibe
        if (dto.getCategoriaId() != null) {
            Categoria categoria = new Categoria();
            categoria.setId(dto.getCategoriaId());
            producto.setCategoria(categoria);
        }
    
        return producto;
    }
    

    
    public void updateEntityFromDto(ProductoRequestDTO dto, Producto producto) {
        producto.setNombre(dto.getNombre());
        producto.setDescripcion(dto.getDescripcion());
        producto.setPrecio(dto.getPrecio());
        producto.setStock(dto.getStock());

        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada con ID: " + dto.getCategoriaId()));
        producto.setCategoria(categoria);
    }
}



