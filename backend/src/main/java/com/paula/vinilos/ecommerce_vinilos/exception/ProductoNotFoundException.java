package com.paula.vinilos.ecommerce_vinilos.exception;

public class ProductoNotFoundException extends RuntimeException {
    public ProductoNotFoundException(Long id) {
        super("Producto no encontrado con id: " + id);
    }
}
