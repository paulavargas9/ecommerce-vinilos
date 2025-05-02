package com.paula.vinilos.ecommerce_vinilos.exception;

public class CategoriaNotFoundException extends RuntimeException {
    public CategoriaNotFoundException(Long id) {
        super("Categoría no encontrada con id: " + id);
    }
}
