package com.paula.vinilos.ecommerce_vinilos.controller;

import com.paula.vinilos.ecommerce_vinilos.dto.PedidoRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.PedidoResponseDTO;
import com.paula.vinilos.ecommerce_vinilos.response.ApiResponse;
import com.paula.vinilos.ecommerce_vinilos.response.ResponseBuilder;
import com.paula.vinilos.ecommerce_vinilos.service.IPedidoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    @Autowired
    private IPedidoService pedidoService;

    
    @GetMapping
    public ResponseEntity<ApiResponse<List<PedidoResponseDTO>>> getAllPedidos() {
        List<PedidoResponseDTO> pedidos = pedidoService.getAllPedidos();
        return ResponseBuilder.ok("Lista de pedidos obtenida correctamente", pedidos);
    }

    @GetMapping("/page")
    public ResponseEntity<ApiResponse<Page<PedidoResponseDTO>>> getPedidosPaginados(Pageable pageable) {
        Page<PedidoResponseDTO> pagina = pedidoService.getPedidosPaginados(pageable);
        return ResponseBuilder.ok("Página de pedidos obtenida correctamente", pagina);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PedidoResponseDTO>> getPedidoById(@PathVariable Long id) {
        PedidoResponseDTO pedido = pedidoService.getPedidoById(id);
        return ResponseBuilder.ok("Pedido encontrado", pedido);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PedidoResponseDTO>> crearPedido(@Valid @RequestBody PedidoRequestDTO pedidoDTO) {
        PedidoResponseDTO nuevoPedido = pedidoService.crearPedido(pedidoDTO);
        return ResponseBuilder.created("Pedido creado correctamente", nuevoPedido);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PedidoResponseDTO>> actualizarPedido(@PathVariable Long id, @Valid @RequestBody PedidoRequestDTO pedidoDTO) {
        PedidoResponseDTO actualizado = pedidoService.actualizarPedido(id, pedidoDTO);
        return ResponseBuilder.ok("Pedido actualizado correctamente", actualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> eliminarPedido(@PathVariable Long id) {
        pedidoService.eliminarPedido(id);
        return ResponseBuilder.noContent("Pedido eliminado correctamente");
    }
}
