package com.paula.vinilos.ecommerce_vinilos.service;

import com.paula.vinilos.ecommerce_vinilos.dto.PedidoRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.PedidoResponseDTO;
import com.paula.vinilos.ecommerce_vinilos.exception.PedidoNotFoundException;
import com.paula.vinilos.ecommerce_vinilos.mapper.PedidoMapper;
import com.paula.vinilos.ecommerce_vinilos.model.Pedido;
import com.paula.vinilos.ecommerce_vinilos.repository.PedidoRepository;
import com.paula.vinilos.ecommerce_vinilos.repository.UsuarioRepository;
import com.paula.vinilos.ecommerce_vinilos.dto.PedidoResumenDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.ItemPedidoDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PedidoService implements IPedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private PedidoMapper pedidoMapper;

    @Autowired
    private UsuarioRepository usuarioRepository;


    @Override
    public List<PedidoResponseDTO> getAllPedidos() {
        return pedidoRepository.findAll().stream()
                .map(pedidoMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public PedidoResponseDTO getPedidoById(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new PedidoNotFoundException(id));
        return pedidoMapper.toDto(pedido);
    }

    @Override
    public PedidoResponseDTO crearPedido(PedidoRequestDTO dto) {
        Pedido pedido = pedidoMapper.toEntity(dto);
        Pedido nuevo = pedidoRepository.save(pedido);
        return pedidoMapper.toDto(nuevo);
    }

    @Override
    public PedidoResponseDTO actualizarPedido(Long id, PedidoRequestDTO dto) {
        Pedido existente = pedidoRepository.findById(id)
                .orElseThrow(() -> new PedidoNotFoundException(id));
        pedidoMapper.updateEntityFromDto(dto, existente);
        Pedido actualizado = pedidoRepository.save(existente);
        return pedidoMapper.toDto(actualizado);
    }

    @Override
    public void eliminarPedido(Long id) {
        if (!pedidoRepository.existsById(id)) {
            throw new PedidoNotFoundException(id);
        }
        pedidoRepository.deleteById(id);
    }

    @Override
    public Page<PedidoResponseDTO> getPedidosPaginados(Pageable pageable) {
        return pedidoRepository.findAll(pageable)
                .map(pedidoMapper::toDto);
    }

    @Override
    public void guardarPedido(Pedido pedido) {
        pedidoRepository.save(pedido);
    }

    public List<PedidoResumenDTO> getPedidosPorUsuario(String email) {
        var usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    
        var pedidos = pedidoRepository.findByUsuario(usuario);
    
        return pedidos.stream().map(pedido -> {
            PedidoResumenDTO dto = new PedidoResumenDTO();
            dto.setFecha(pedido.getFecha().toLocalDate());
            dto.setTotal(pedido.getTotal());
            dto.setEstado("Completado"); // Opcional: simulado
    
            List<ItemPedidoDTO> items = pedido.getDetalles().stream().map(detalle -> {
                ItemPedidoDTO item = new ItemPedidoDTO();
                item.setNombreProducto(detalle.getProducto().getNombre());
                item.setCantidad(detalle.getCantidad());
                item.setPrecio(detalle.getPrecioUnitario()); 

                return item;
            }).toList();
    
            dto.setItems(items);
            return dto;
        }).toList();
    }
    





}
