package com.paula.vinilos.ecommerce_vinilos.repository;

import com.paula.vinilos.ecommerce_vinilos.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface CategoriaRepository extends JpaRepository<Categoria, Long>{
    // Podés añadir consultas personalizadas si las necesitás más adelante
}


