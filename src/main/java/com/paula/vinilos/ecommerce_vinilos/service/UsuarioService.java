package com.paula.vinilos.ecommerce_vinilos.service;

import com.paula.vinilos.ecommerce_vinilos.dto.UsuarioRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.UsuarioResponseDTO;
import com.paula.vinilos.ecommerce_vinilos.exception.UsuarioNotFoundException;
import com.paula.vinilos.ecommerce_vinilos.mapper.UsuarioMapper;
import com.paula.vinilos.ecommerce_vinilos.model.Usuario;
import com.paula.vinilos.ecommerce_vinilos.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService implements IUsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioMapper usuarioMapper;

    @Override
    public List<UsuarioResponseDTO> getAllUsuarios() {
        return usuarioRepository.findAll().stream()
                .map(usuarioMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public UsuarioResponseDTO getUsuarioById(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNotFoundException(id));
        return usuarioMapper.toDto(usuario);
    }

    @Override
    public UsuarioResponseDTO crearUsuario(UsuarioRequestDTO dto) {
        Usuario usuario = usuarioMapper.toEntity(dto);
        Usuario nuevo = usuarioRepository.save(usuario);
        return usuarioMapper.toDto(nuevo);
    }

    @Override
    public UsuarioResponseDTO actualizarUsuario(Long id, UsuarioRequestDTO dto) {
        Usuario usuarioExistente = usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNotFoundException(id));
        usuarioMapper.updateEntityFromDto(dto, usuarioExistente);
        Usuario actualizado = usuarioRepository.save(usuarioExistente);
        return usuarioMapper.toDto(actualizado);
    }

    @Override
    public void eliminarUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new UsuarioNotFoundException(id);
        }
        usuarioRepository.deleteById(id);
    }

    @Override
    public Page<UsuarioResponseDTO> getUsuariosPaginados(Pageable pageable) {
        return usuarioRepository.findAll(pageable)
                .map(usuarioMapper::toDto);
    }
}
