package com.paula.vinilos.ecommerce_vinilos.dto;

public class LoginResponse {
    private String token;
    private String name;
    private String email;
    private Long id; // 👈

    // constructor
    public LoginResponse(String token, String name, String email, Long id) {
        this.token = token;
        this.name = name;
        this.email = email;
        this.id = id;
    }

    
    public String getToken() { return token; }
    public String getName() { return name; }
    public String getEmail() { return email; }

    
}
