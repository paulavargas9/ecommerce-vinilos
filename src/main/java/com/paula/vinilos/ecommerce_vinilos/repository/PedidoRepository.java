package com.paula.vinilos.ecommerce_vinilos.repository;

import com.paula.vinilos.ecommerce_vinilos.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
  
    Page<Pedido> findAll(Pageable pageable);
}
