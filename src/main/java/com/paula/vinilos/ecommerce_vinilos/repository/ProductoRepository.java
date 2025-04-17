package com.paula.vinilos.ecommerce_vinilos.repository;

import com.paula.vinilos.ecommerce_vinilos.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface ProductoRepository  extends JpaRepository<Producto, Long> {

}
