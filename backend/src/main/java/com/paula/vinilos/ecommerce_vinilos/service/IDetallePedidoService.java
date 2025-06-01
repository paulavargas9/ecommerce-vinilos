package com.paula.vinilos.ecommerce_vinilos.service;

import com.paula.vinilos.ecommerce_vinilos.dto.DetallePedidoRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.DetallePedidoResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IDetallePedidoService {
    List<DetallePedidoResponseDTO> getAllDetallePedidos();
    DetallePedidoResponseDTO getDetallePedidoById(Long id);
    DetallePedidoResponseDTO crearDetallePedido(DetallePedidoRequestDTO dto);
    DetallePedidoResponseDTO actualizarDetallePedido(Long id, DetallePedidoRequestDTO dto);
    void eliminarDetallePedido(Long id);
    Page<DetallePedidoResponseDTO> getDetallePedidosPaginados(Pageable pageable);  // Paginación
    List<DetallePedidoResponseDTO> getDetallesPorPedidoId(Long pedidoId);

}
