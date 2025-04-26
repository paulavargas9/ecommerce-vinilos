package com.paula.vinilos.ecommerce_vinilos.exception;

public class PedidoNotFoundException extends RuntimeException {
    public PedidoNotFoundException(Long id) {
        super("Pedido no encontrado con id: " + id);
    }
}
