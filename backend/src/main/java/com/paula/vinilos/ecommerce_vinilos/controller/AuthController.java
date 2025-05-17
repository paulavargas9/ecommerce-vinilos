package com.paula.vinilos.ecommerce_vinilos.controller;

import com.paula.vinilos.ecommerce_vinilos.dto.LoginRequest;
import com.paula.vinilos.ecommerce_vinilos.dto.LoginResponse;
import com.paula.vinilos.ecommerce_vinilos.model.Usuario;
import com.paula.vinilos.ecommerce_vinilos.repository.UsuarioRepository;
import com.paula.vinilos.ecommerce_vinilos.security.JwtUtil;
import com.paula.vinilos.ecommerce_vinilos.service.UserDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Permitir acceso React
public class AuthController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    System.out.println("Login recibido para " + request.getEmail());
    try {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(
            new LoginResponse(token, userDetails.getUsername(), request.getEmail())
        );

    } catch (BadCredentialsException e) {
        return ResponseEntity.status(401).body("Email o contraseña incorrectos");
    }
}




    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario newUser) {
        // Comprobar si ya existe ese email
        if (usuarioRepository.findByEmail(newUser.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("El email ya está en uso");
        }

        // Encriptar la contraseña
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));

        // Establecer rol por defecto si no se recibe
        if (newUser.getRol() == null || newUser.getRol().isBlank()) {
            newUser.setRol("USER");
        }

        // Guardar usuario
        Usuario saved = usuarioRepository.save(newUser);
        return ResponseEntity.ok("Usuario registrado correctamente: " + saved.getEmail());
    }


}
