package com.paula.vinilos.ecommerce_vinilos.controller;
import com.paula.vinilos.ecommerce_vinilos.dto.PedidoRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.PedidoResponseDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.PedidoResumenDTO;
import com.paula.vinilos.ecommerce_vinilos.model.DetallePedido;
import com.paula.vinilos.ecommerce_vinilos.model.Pedido;
import com.paula.vinilos.ecommerce_vinilos.model.Producto;
import com.paula.vinilos.ecommerce_vinilos.model.Usuario;
import com.paula.vinilos.ecommerce_vinilos.repository.ProductoRepository;
import com.paula.vinilos.ecommerce_vinilos.repository.UsuarioRepository;
import com.paula.vinilos.ecommerce_vinilos.response.ApiResponse;
import com.paula.vinilos.ecommerce_vinilos.response.ResponseBuilder;
import com.paula.vinilos.ecommerce_vinilos.service.IPedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.paula.vinilos.ecommerce_vinilos.dto.ItemDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.CheckoutRequest;
import com.paula.vinilos.ecommerce_vinilos.security.JwtService;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {


    @Autowired
    private JwtService jwtService;


    @Autowired
    private IPedidoService pedidoService;

    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private ProductoRepository productoRepository;

    
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

    

    @PostMapping("/checkout")
    public ResponseEntity<ApiResponse<String>> realizarCheckout(
        @RequestBody CheckoutRequest request,
        @AuthenticationPrincipal UserDetails userDetails
    ) {
        // Obtener usuario autenticado
        String email = userDetails.getUsername();
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + email));
    
        // Crear pedido
        Pedido pedido = new Pedido();
        pedido.setFecha(LocalDateTime.now());
        pedido.setTotal(request.getTotal());
        pedido.setUsuario(usuario);
    
        // Procesar productos del carrito
        List<ItemDTO> items = request.getItems();
    
        List<DetallePedido> detalles = items.stream().map(item -> {
            DetallePedido detalle = new DetallePedido();
    
            //  Obtener producto real desde la base de datos
            Producto producto = productoRepository.findById(item.getProductoId())
            .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + item.getProductoId()));

        if (producto.getStock() < item.getCantidad()) {
            throw new RuntimeException("No hay stock suficiente para el producto: " + producto.getNombre());
        }
                    // Validación de stock disponible
        if (producto.getStock() < item.getCantidad()) {
            throw new RuntimeException("Stock insuficiente para el producto: " + producto.getNombre());
        }

        int nuevaCantidad = producto.getStock() - item.getCantidad();
        if (nuevaCantidad < 0) {
            throw new RuntimeException("Stock insuficiente para el producto: " + producto.getNombre());
        }

                producto.setStock(nuevaCantidad);
                productoRepository.save(producto); 
                detalle.setProducto(producto);
                detalle.setCantidad(item.getCantidad());
                detalle.setPrecioUnitario(item.getPrecio());
                detalle.setPedido(pedido);
    
            return detalle;
        }).toList();
    
        pedido.setDetalles(detalles);
    
        // Guardar pedido y detalles
        pedidoService.guardarPedido(pedido);
    
        return ResponseBuilder.ok("Pedido registrado correctamente", "OK");
    }
    
    @GetMapping("/mis-pedidos")
public ResponseEntity<List<PedidoResumenDTO>> getMisPedidos(HttpServletRequest request) {
    String email = jwtService.extractEmail(request); // extraer email desde token
    List<PedidoResumenDTO> pedidos = pedidoService.getPedidosPorUsuario(email);
    return ResponseEntity.ok(pedidos);
}

    
}
