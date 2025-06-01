package com.paula.vinilos.ecommerce_vinilos.dto;

public class LoginResponse {
    private String token;
    private String name;
    private String email;
    private Long id;
    private String rol; // 👈 Importante: incluir rol

    // Constructor
    public LoginResponse(String token, String name, String email, Long id, String rol) {
        this.token = token;
        this.name = name;
        this.email = email;
        this.id = id;
        this.rol = rol;
    }

    // Getters
    public String getToken() {
        return token;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public Long getId() {
        return id;
    }

    public String getRol() {
        return rol;
    }
}
