package com.paula.vinilos.ecommerce_vinilos.controller;

import com.paula.vinilos.ecommerce_vinilos.model.DetallePedido;
import com.paula.vinilos.ecommerce_vinilos.repository.DetallePedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/detalles")
public class DetallePedidoController {

    @Autowired
    private DetallePedidoRepository detallePedidoRepository;

    // listar todos los detalles de pedido
    @GetMapping
    public List<DetallePedido> getAllDetalles() {
        return detallePedidoRepository.findAll();
    }

    // obtener un detalle por id
    @GetMapping("/{id}")
    public ResponseEntity<DetallePedido> getDetalleById(@PathVariable Long id) {
        Optional<DetallePedido> detalle = detallePedidoRepository.findById(id);
        return detalle.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // crear un nuevo detalle de pedido
    @PostMapping
    public DetallePedido createDetalle(@RequestBody DetallePedido detallePedido) {
        return detallePedidoRepository.save(detallePedido);
    }

    // editar un detalle existente
    @PutMapping("/{id}")
    public ResponseEntity<DetallePedido> updateDetalle(@PathVariable Long id, @RequestBody DetallePedido nuevoDetalle) {
        return detallePedidoRepository.findById(id)
                .map(detalleExistente -> {
                    detalleExistente.setCantidad(nuevoDetalle.getCantidad());
                    detalleExistente.setPrecioUnitario(nuevoDetalle.getPrecioUnitario());
                    detalleExistente.setProducto(nuevoDetalle.getProducto());
                    detalleExistente.setPedido(nuevoDetalle.getPedido());
                    detallePedidoRepository.save(detalleExistente);
                    return ResponseEntity.ok(detalleExistente);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // eliminar un detalle por id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDetalle(@PathVariable Long id) {
        if (detallePedidoRepository.existsById(id)) {
            detallePedidoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
