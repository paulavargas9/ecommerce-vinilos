package com.paula.vinilos.ecommerce_vinilos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.paula.vinilos.ecommerce_vinilos.model.Usuario;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Page<Usuario> findAll(Pageable pageable);
}