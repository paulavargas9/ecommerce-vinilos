package com.paula.vinilos.ecommerce_vinilos.mapper;

import org.springframework.stereotype.Component;
import com.paula.vinilos.ecommerce_vinilos.model.Usuario;
import com.paula.vinilos.ecommerce_vinilos.dto.UsuarioRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.UsuarioResponseDTO;

@Component
public class UsuarioMapper {

    // convertir de entity a responsedto
    public UsuarioResponseDTO toDto(Usuario usuario) {
        UsuarioResponseDTO dto = new UsuarioResponseDTO();
        dto.setId(usuario.getId());
        dto.setNombre(usuario.getNombre());
        dto.setEmail(usuario.getEmail());
        dto.setRol(usuario.getRol());
        return dto;
    }

    // convertir de RequestDTO a entity 
    public Usuario toEntity(UsuarioRequestDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setNombre(dto.getNombre());
        usuario.setEmail(dto.getEmail());
        usuario.setPassword(dto.getPassword()); 
        usuario.setRol(dto.getRol());
        return usuario;
    }

    //  método para actualizar entidad existente desde dto
    public void updateEntityFromDto(UsuarioRequestDTO dto, Usuario usuario) {
        usuario.setNombre(dto.getNombre());
        usuario.setEmail(dto.getEmail());
        usuario.setPassword(dto.getPassword());
        usuario.setRol(dto.getRol());
    }
}
