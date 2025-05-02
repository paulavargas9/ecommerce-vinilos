package com.paula.vinilos.ecommerce_vinilos.service;

import com.paula.vinilos.ecommerce_vinilos.dto.PedidoRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.PedidoResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IPedidoService {
    List<PedidoResponseDTO> getAllPedidos();
    PedidoResponseDTO getPedidoById(Long id);
    PedidoResponseDTO crearPedido(PedidoRequestDTO dto);
    PedidoResponseDTO actualizarPedido(Long id, PedidoRequestDTO dto);
    void eliminarPedido(Long id);
    Page<PedidoResponseDTO> getPedidosPaginados(Pageable pageable);  // Paginación
}
