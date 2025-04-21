package com.paula.vinilos.ecommerce_vinilos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.paula.vinilos.ecommerce_vinilos.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    boolean existsByEmail(String email);
}