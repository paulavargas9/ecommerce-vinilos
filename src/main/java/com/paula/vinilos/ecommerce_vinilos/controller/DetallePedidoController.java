package com.paula.vinilos.ecommerce_vinilos.controller;

import com.paula.vinilos.ecommerce_vinilos.dto.DetallePedidoRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.DetallePedidoResponseDTO;
import com.paula.vinilos.ecommerce_vinilos.exception.DetallePedidoNotFoundException;
import com.paula.vinilos.ecommerce_vinilos.mapper.DetallePedidoMapper;
import com.paula.vinilos.ecommerce_vinilos.model.DetallePedido;
import com.paula.vinilos.ecommerce_vinilos.repository.DetallePedidoRepository;
import com.paula.vinilos.ecommerce_vinilos.response.ApiResponse;
import com.paula.vinilos.ecommerce_vinilos.response.ResponseBuilder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/detalles-pedido")
@CrossOrigin(origins = "*")
public class DetallePedidoController {

    @Autowired
    private DetallePedidoRepository detallePedidoRepository;

    @Autowired
    private DetallePedidoMapper detallePedidoMapper;

    
    @GetMapping
    public ResponseEntity<ApiResponse<List<DetallePedidoResponseDTO>>> getAllDetallesPedido() {
        List<DetallePedidoResponseDTO> detalles = detallePedidoRepository.findAll()
                .stream()
                .map(detallePedidoMapper::toDto)
                .collect(Collectors.toList());
        return ResponseBuilder.ok("Lista de detalles de pedido obtenida correctamente", detalles);
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DetallePedidoResponseDTO>> getDetallePedidoById(@PathVariable Long id) {
        DetallePedido detalle = detallePedidoRepository.findById(id)
                .orElseThrow(() -> new DetallePedidoNotFoundException(id));
        return ResponseBuilder.ok("Detalle de pedido encontrado", detallePedidoMapper.toDto(detalle));
    }

    
    @PostMapping
    public ResponseEntity<ApiResponse<DetallePedidoResponseDTO>> crearDetallePedido(@Valid @RequestBody DetallePedidoRequestDTO detalleDTO) {
        DetallePedido detalle = detallePedidoMapper.toEntity(detalleDTO);
        DetallePedido nuevoDetalle = detallePedidoRepository.save(detalle);
        return ResponseBuilder.created("Detalle de pedido creado correctamente", detallePedidoMapper.toDto(nuevoDetalle));
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<DetallePedidoResponseDTO>> actualizarDetallePedido(@PathVariable Long id, @Valid @RequestBody DetallePedidoRequestDTO detalleDTO) {
        DetallePedido detalleExistente = detallePedidoRepository.findById(id)
                .orElseThrow(() -> new DetallePedidoNotFoundException(id));

        detallePedidoMapper.updateEntityFromDto(detalleDTO, detalleExistente);
        DetallePedido detalleActualizado = detallePedidoRepository.save(detalleExistente);

        return ResponseBuilder.ok("Detalle de pedido actualizado correctamente", detallePedidoMapper.toDto(detalleActualizado));
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> eliminarDetallePedido(@PathVariable Long id) {
        if (detallePedidoRepository.existsById(id)) {
            detallePedidoRepository.deleteById(id);
            return ResponseBuilder.deleted("Detalle de pedido eliminado correctamente");
        }
        throw new DetallePedidoNotFoundException(id);
    }
}
