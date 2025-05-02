package com.paula.vinilos.ecommerce_vinilos.exception;

public class DetallePedidoNotFoundException extends RuntimeException {
    public DetallePedidoNotFoundException(Long id) {
        super("Detalle de pedido no encontrado con id: " + id);
    }
}
