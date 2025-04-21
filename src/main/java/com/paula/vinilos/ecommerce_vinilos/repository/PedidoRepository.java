package com.paula.vinilos.ecommerce_vinilos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.paula.vinilos.ecommerce_vinilos.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}
