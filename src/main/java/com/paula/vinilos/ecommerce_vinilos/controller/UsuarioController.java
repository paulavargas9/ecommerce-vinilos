package com.paula.vinilos.ecommerce_vinilos.controller;

import com.paula.vinilos.ecommerce_vinilos.dto.UsuarioRequestDTO;
import com.paula.vinilos.ecommerce_vinilos.dto.UsuarioResponseDTO;

import com.paula.vinilos.ecommerce_vinilos.mapper.UsuarioMapper;

import com.paula.vinilos.ecommerce_vinilos.response.ApiResponse;
import com.paula.vinilos.ecommerce_vinilos.response.ResponseBuilder;
import com.paula.vinilos.ecommerce_vinilos.service.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    // Inyectando el servicio de Usuario
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioMapper usuarioMapper;

    @GetMapping
    public ResponseEntity<ApiResponse<List<UsuarioResponseDTO>>> getAllUsuarios() {
        List<UsuarioResponseDTO> usuarios = usuarioService.getAllUsuarios();
        return ResponseBuilder.ok("Lista de usuarios obtenida correctamente", usuarios);
    }
      
      @GetMapping("/page")
      public ResponseEntity<ApiResponse<Page<UsuarioResponseDTO>>> getUsuariosPaginados(Pageable pageable) {
          Page<UsuarioResponseDTO> pagina = usuarioService.getUsuariosPaginados(pageable);
          return ResponseBuilder.ok("Página de usuarios obtenida correctamente", pagina);
      }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UsuarioResponseDTO>> getUsuarioById(@PathVariable Long id) {
        UsuarioResponseDTO usuario = usuarioService.getUsuarioById(id);
        return ResponseBuilder.ok("Usuario encontrado", usuario);
    }

  
    @PostMapping
    public ResponseEntity<ApiResponse<UsuarioResponseDTO>> crearUsuario(@Valid @RequestBody UsuarioRequestDTO usuarioDTO) {
        UsuarioResponseDTO nuevoUsuario = usuarioService.crearUsuario(usuarioDTO);
        return ResponseBuilder.created("Usuario creado correctamente", nuevoUsuario);
    }

   
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UsuarioResponseDTO>> actualizarUsuario(@PathVariable Long id, @Valid @RequestBody UsuarioRequestDTO usuarioDTO) {
        UsuarioResponseDTO usuarioActualizado = usuarioService.actualizarUsuario(id, usuarioDTO);
        return ResponseBuilder.ok("Usuario actualizado correctamente", usuarioActualizado);
    }

  
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
        return ResponseBuilder.noContent("Usuario eliminado correctamente");
    }
}
