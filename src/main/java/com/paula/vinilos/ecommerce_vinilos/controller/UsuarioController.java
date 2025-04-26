package com.paula.vinilos.ecommerce_vinilos.controller;

import com.paula.vinilos.ecommerce_vinilos.dto.UsuarioRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.UsuarioResponseDTO;
import com.paula.vinilos.ecommerce_vinilos.exception.UsuarioNotFoundException;
import com.paula.vinilos.ecommerce_vinilos.mapper.UsuarioMapper;
import com.paula.vinilos.ecommerce_vinilos.model.Usuario;
import com.paula.vinilos.ecommerce_vinilos.repository.UsuarioRepository;
import com.paula.vinilos.ecommerce_vinilos.response.ApiResponse;
import com.paula.vinilos.ecommerce_vinilos.response.ResponseBuilder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioMapper usuarioMapper;

   
    @GetMapping
    public ResponseEntity<ApiResponse<List<UsuarioResponseDTO>>> getAllUsuarios() {
        List<UsuarioResponseDTO> usuarios = usuarioRepository.findAll()
                .stream()
                .map(usuarioMapper::toDto)
                .collect(Collectors.toList());
        return ResponseBuilder.ok("Lista de usuarios obtenida correctamente", usuarios);
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UsuarioResponseDTO>> getUsuarioById(@PathVariable Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNotFoundException(id));
        return ResponseBuilder.ok("Usuario encontrado", usuarioMapper.toDto(usuario));
    }

  
    @PostMapping
    public ResponseEntity<ApiResponse<UsuarioResponseDTO>> crearUsuario(@Valid @RequestBody UsuarioRequestDTO usuarioDTO) {
        Usuario usuario = usuarioMapper.toEntity(usuarioDTO);
        Usuario nuevoUsuario = usuarioRepository.save(usuario);
        return ResponseBuilder.created("Usuario creado correctamente", usuarioMapper.toDto(nuevoUsuario));
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UsuarioResponseDTO>> actualizarUsuario(@PathVariable Long id, @Valid @RequestBody UsuarioRequestDTO usuarioDTO) {
        Usuario usuarioExistente = usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNotFoundException(id));

        usuarioMapper.updateEntityFromDto(usuarioDTO, usuarioExistente);
        Usuario usuarioActualizado = usuarioRepository.save(usuarioExistente);

        return ResponseBuilder.ok("Usuario actualizado correctamente", usuarioMapper.toDto(usuarioActualizado));
    }

 
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> eliminarUsuario(@PathVariable Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return ResponseBuilder.deleted("Usuario eliminado correctamente");
        }
        throw new UsuarioNotFoundException(id);
    }
}
