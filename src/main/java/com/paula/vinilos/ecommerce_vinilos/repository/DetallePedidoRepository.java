package com.paula.vinilos.ecommerce_vinilos.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.paula.vinilos.ecommerce_vinilos.model.DetallePedido;

public interface DetallePedidoRepository extends JpaRepository<DetallePedido, Long> {
    Page<DetallePedido> findAll(Pageable pageable);
}