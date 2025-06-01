package com.paula.vinilos.ecommerce_vinilos.controller;

import com.paula.vinilos.ecommerce_vinilos.dto.DetallePedidoRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.DetallePedidoResponseDTO;
import com.paula.vinilos.ecommerce_vinilos.response.ApiResponse;
import com.paula.vinilos.ecommerce_vinilos.response.ResponseBuilder;
import com.paula.vinilos.ecommerce_vinilos.service.IDetallePedidoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/detalle-pedidos")
@CrossOrigin(origins = "*")
public class DetallePedidoController {

    @Autowired
    private IDetallePedidoService detallePedidoService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<DetallePedidoResponseDTO>>> getAllDetallePedidos() {
        List<DetallePedidoResponseDTO> detalles = detallePedidoService.getAllDetallePedidos();
        return ResponseBuilder.ok("Lista de detalles de pedidos obtenida correctamente", detalles);
    }

    
    @GetMapping("/page")
    public ResponseEntity<ApiResponse<Page<DetallePedidoResponseDTO>>> getDetallePedidosPaginados(Pageable pageable) {
        Page<DetallePedidoResponseDTO> pagina = detallePedidoService.getDetallePedidosPaginados(pageable);
        return ResponseBuilder.ok("Página de detalles de pedidos obtenida correctamente", pagina);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DetallePedidoResponseDTO>> getDetallePedidoById(@PathVariable Long id) {
        DetallePedidoResponseDTO detallePedido = detallePedidoService.getDetallePedidoById(id);
        return ResponseBuilder.ok("Detalle de pedido encontrado", detallePedido);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<DetallePedidoResponseDTO>> crearDetallePedido(@Valid @RequestBody DetallePedidoRequestDTO detallePedidoDTO) {
        DetallePedidoResponseDTO nuevoDetallePedido = detallePedidoService.crearDetallePedido(detallePedidoDTO);
        return ResponseBuilder.created("Detalle de pedido creado correctamente", nuevoDetallePedido);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<DetallePedidoResponseDTO>> actualizarDetallePedido(@PathVariable Long id, @Valid @RequestBody DetallePedidoRequestDTO detallePedidoDTO) {
        DetallePedidoResponseDTO actualizado = detallePedidoService.actualizarDetallePedido(id, detallePedidoDTO);
        return ResponseBuilder.ok("Detalle de pedido actualizado correctamente", actualizado);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> eliminarDetallePedido(@PathVariable Long id) {
        detallePedidoService.eliminarDetallePedido(id);
        return ResponseBuilder.noContent("Detalle de pedido eliminado correctamente");
    }

    @GetMapping("/pedido/{pedidoId}")
public ResponseEntity<ApiResponse<List<DetallePedidoResponseDTO>>> getDetallesPorPedidoId(@PathVariable Long pedidoId) {
    List<DetallePedidoResponseDTO> detalles = detallePedidoService.getDetallesPorPedidoId(pedidoId);
    return ResponseBuilder.ok("Detalles del pedido obtenidos correctamente", detalles);
}

}
