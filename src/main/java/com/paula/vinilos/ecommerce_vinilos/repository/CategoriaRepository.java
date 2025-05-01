package com.paula.vinilos.ecommerce_vinilos.repository;

import com.paula.vinilos.ecommerce_vinilos.model.Categoria;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CategoriaRepository extends JpaRepository<Categoria, Long>{
    Page<Categoria> findAll(Pageable pageable);
}


