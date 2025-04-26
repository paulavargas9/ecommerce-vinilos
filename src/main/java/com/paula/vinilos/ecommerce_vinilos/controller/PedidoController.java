package com.paula.vinilos.ecommerce_vinilos.controller;

import com.paula.vinilos.ecommerce_vinilos.dto.PedidoRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.PedidoResponseDTO;
import com.paula.vinilos.ecommerce_vinilos.exception.PedidoNotFoundException;
import com.paula.vinilos.ecommerce_vinilos.mapper.PedidoMapper;
import com.paula.vinilos.ecommerce_vinilos.model.Pedido;
import com.paula.vinilos.ecommerce_vinilos.repository.PedidoRepository;
import com.paula.vinilos.ecommerce_vinilos.response.ApiResponse;
import com.paula.vinilos.ecommerce_vinilos.response.ResponseBuilder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private PedidoMapper pedidoMapper;

    
    @GetMapping
    public ResponseEntity<ApiResponse<List<PedidoResponseDTO>>> getAllPedidos() {
        List<PedidoResponseDTO> pedidos = pedidoRepository.findAll()
                .stream()
                .map(pedidoMapper::toDto)
                .collect(Collectors.toList());
        return ResponseBuilder.ok("Lista de pedidos obtenida correctamente", pedidos);
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PedidoResponseDTO>> getPedidoById(@PathVariable Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new PedidoNotFoundException(id));
        return ResponseBuilder.ok("Pedido encontrado", pedidoMapper.toDto(pedido));
    }

    
    @PostMapping
    public ResponseEntity<ApiResponse<PedidoResponseDTO>> crearPedido(@Valid @RequestBody PedidoRequestDTO pedidoDTO) {
        Pedido pedido = pedidoMapper.toEntity(pedidoDTO);
        Pedido nuevoPedido = pedidoRepository.save(pedido);
        return ResponseBuilder.created("Pedido creado correctamente", pedidoMapper.toDto(nuevoPedido));
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PedidoResponseDTO>> actualizarPedido(@PathVariable Long id, @Valid @RequestBody PedidoRequestDTO pedidoDTO) {
        Pedido pedidoExistente = pedidoRepository.findById(id)
                .orElseThrow(() -> new PedidoNotFoundException(id));

        pedidoMapper.updateEntityFromDto(pedidoDTO, pedidoExistente);
        Pedido pedidoActualizado = pedidoRepository.save(pedidoExistente);

        return ResponseBuilder.ok("Pedido actualizado correctamente", pedidoMapper.toDto(pedidoActualizado));
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> eliminarPedido(@PathVariable Long id) {
        if (pedidoRepository.existsById(id)) {
            pedidoRepository.deleteById(id);
            return ResponseBuilder.deleted("Pedido eliminado correctamente");
        }
        throw new PedidoNotFoundException(id);
    }
}

