package com.paula.vinilos.ecommerce_vinilos.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class CheckoutController {

    @PostMapping("/checkout")
    public ResponseEntity<?> procesarPedido(@RequestBody Map<String, Object> datos, HttpServletRequest request) {

        String usuario = request.getUserPrincipal() != null ? request.getUserPrincipal().getName() : "anónimo";

        System.out.println("🛒 Pedido recibido de: " + usuario);
        System.out.println("Contenido del carrito: " + datos);

        // Aquí más adelante: guardar pedido, generar ID, etc.

        return ResponseEntity.ok("✅ Pedido procesado correctamente para " + usuario);
    }
}
