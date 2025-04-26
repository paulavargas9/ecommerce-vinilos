package com.paula.vinilos.ecommerce_vinilos.controller;

import com.paula.vinilos.ecommerce_vinilos.dto.DetallePedidoRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.DetallePedidoResponseDTO;
import com.paula.vinilos.ecommerce_vinilos.mapper.DetallePedidoMapper;
import com.paula.vinilos.ecommerce_vinilos.model.DetallePedido;
import com.paula.vinilos.ecommerce_vinilos.repository.DetallePedidoRepository;

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
    public List<DetallePedidoResponseDTO> getAllDetallesPedido() {
        return detallePedidoRepository.findAll()
                .stream()
                .map(detallePedidoMapper::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetallePedidoResponseDTO> getDetallePedidoById(@PathVariable Long id) {
        DetallePedido detallePedido = detallePedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Detalle de pedido no encontrado con id: " + id));
        return ResponseEntity.ok(detallePedidoMapper.toDto(detallePedido));
    }

    
    @PostMapping
    public ResponseEntity<DetallePedidoResponseDTO> crearDetallePedido(@Valid @RequestBody DetallePedidoRequestDTO detallePedidoDTO) {
        DetallePedido detallePedido = detallePedidoMapper.toEntity(detallePedidoDTO);
        DetallePedido nuevoDetallePedido = detallePedidoRepository.save(detallePedido);
        return ResponseEntity.ok(detallePedidoMapper.toDto(nuevoDetallePedido));
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<DetallePedidoResponseDTO> actualizarDetallePedido(@PathVariable Long id, @Valid @RequestBody DetallePedidoRequestDTO detallePedidoDTO) {
        DetallePedido detallePedidoExistente = detallePedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Detalle de pedido no encontrado con id: " + id));

        detallePedidoMapper.updateEntityFromDto(detallePedidoDTO, detallePedidoExistente);
        DetallePedido detallePedidoActualizado = detallePedidoRepository.save(detallePedidoExistente);

        return ResponseEntity.ok(detallePedidoMapper.toDto(detallePedidoActualizado));
    }

   
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarDetallePedido(@PathVariable Long id) {
        if (detallePedidoRepository.existsById(id)) {
            detallePedidoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

