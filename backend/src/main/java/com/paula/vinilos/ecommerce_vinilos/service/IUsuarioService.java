package com.paula.vinilos.ecommerce_vinilos.service;

import com.paula.vinilos.ecommerce_vinilos.dto.UsuarioRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.UsuarioResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IUsuarioService {
    List<UsuarioResponseDTO> getAllUsuarios();
    UsuarioResponseDTO getUsuarioById(Long id);
    UsuarioResponseDTO crearUsuario(UsuarioRequestDTO dto);
    UsuarioResponseDTO actualizarUsuario(Long id, UsuarioRequestDTO dto);
    void eliminarUsuario(Long id);
    Page<UsuarioResponseDTO> getUsuariosPaginados(Pageable pageable); // Método de paginación
}
