package com.paula.vinilos.ecommerce_vinilos.service;

import com.paula.vinilos.ecommerce_vinilos.dto.DetallePedidoRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.DetallePedidoResponseDTO;
import com.paula.vinilos.ecommerce_vinilos.mapper.DetallePedidoMapper;
import com.paula.vinilos.ecommerce_vinilos.model.DetallePedido;
import com.paula.vinilos.ecommerce_vinilos.repository.DetallePedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DetallePedidoService implements IDetallePedidoService {

    @Autowired
    private DetallePedidoRepository detallePedidoRepository;

    @Autowired
    private DetallePedidoMapper detallePedidoMapper;

    @Override
    public List<DetallePedidoResponseDTO> getAllDetallePedidos() {
        return detallePedidoRepository.findAll().stream()
                .map(detallePedidoMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public DetallePedidoResponseDTO getDetallePedidoById(Long id) {
        DetallePedido detallePedido = detallePedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Detalle de pedido no encontrado con ID: " + id));
        return detallePedidoMapper.toDto(detallePedido);
    }

    @Override
    public DetallePedidoResponseDTO crearDetallePedido(DetallePedidoRequestDTO dto) {
        DetallePedido detallePedido = detallePedidoMapper.toEntity(dto);
        DetallePedido nuevo = detallePedidoRepository.save(detallePedido);
        return detallePedidoMapper.toDto(nuevo);
    }

    @Override
    public DetallePedidoResponseDTO actualizarDetallePedido(Long id, DetallePedidoRequestDTO dto) {
        DetallePedido detallePedidoExistente = detallePedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Detalle de pedido no encontrado con ID: " + id));
        detallePedidoMapper.updateEntityFromDto(dto, detallePedidoExistente);
        DetallePedido actualizado = detallePedidoRepository.save(detallePedidoExistente);
        return detallePedidoMapper.toDto(actualizado);
    }

    @Override
    public void eliminarDetallePedido(Long id) {
        if (!detallePedidoRepository.existsById(id)) {
            throw new RuntimeException("Detalle de pedido no encontrado con ID: " + id);
        }
        detallePedidoRepository.deleteById(id);
    }

    @Override
    public Page<DetallePedidoResponseDTO> getDetallePedidosPaginados(Pageable pageable) {
        return detallePedidoRepository.findAll(pageable)
                .map(detallePedidoMapper::toDto);
    }
}
