package com.paula.vinilos.ecommerce_vinilos.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.paula.vinilos.ecommerce_vinilos.dto.DetallePedidoRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.DetallePedidoResponseDTO;
import com.paula.vinilos.ecommerce_vinilos.model.DetallePedido;
import com.paula.vinilos.ecommerce_vinilos.model.Pedido;
import com.paula.vinilos.ecommerce_vinilos.model.Producto;
import com.paula.vinilos.ecommerce_vinilos.repository.PedidoRepository;
import com.paula.vinilos.ecommerce_vinilos.repository.ProductoRepository;

@Component
public class DetallePedidoMapper {

    private final PedidoRepository pedidoRepository;
    private final ProductoRepository productoRepository;

    @Autowired
    public DetallePedidoMapper(PedidoRepository pedidoRepository, ProductoRepository productoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.productoRepository = productoRepository;
    }

    
    public DetallePedidoResponseDTO toDto(DetallePedido detallePedido) {
        DetallePedidoResponseDTO dto = new DetallePedidoResponseDTO();
        dto.setId(detallePedido.getId());
        dto.setCantidad(detallePedido.getCantidad());
        dto.setPrecioUnitario(detallePedido.getPrecioUnitario());
        if (detallePedido.getProducto() != null) {
            dto.setProductoId(detallePedido.getProducto().getId());
        }
        if (detallePedido.getPedido() != null) {
            dto.setPedidoId(detallePedido.getPedido().getId());
        }
        return dto;
    }

   
    public DetallePedido toEntity(DetallePedidoRequestDTO dto) {
        DetallePedido detallePedido = new DetallePedido();
        detallePedido.setCantidad(dto.getCantidad());
        detallePedido.setPrecioUnitario(dto.getPrecioUnitario());

        Producto producto = productoRepository.findById(dto.getProductoId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + dto.getProductoId()));
        detallePedido.setProducto(producto);

        Pedido pedido = pedidoRepository.findById(dto.getPedidoId())
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado con ID: " + dto.getPedidoId()));
        detallePedido.setPedido(pedido);

        return detallePedido;
    }

    
    public void updateEntityFromDto(DetallePedidoRequestDTO dto, DetallePedido detallePedido) {
        detallePedido.setCantidad(dto.getCantidad());
        detallePedido.setPrecioUnitario(dto.getPrecioUnitario());

        Producto producto = productoRepository.findById(dto.getProductoId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + dto.getProductoId()));
        detallePedido.setProducto(producto);

        Pedido pedido = pedidoRepository.findById(dto.getPedidoId())
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado con ID: " + dto.getPedidoId()));
        detallePedido.setPedido(pedido);
    }
}
