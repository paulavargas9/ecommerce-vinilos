package com.paula.vinilos.ecommerce_vinilos.dto;

public class CategoriaResponseDTO {

    private Long id;
    private String nombre;
    private String descripcion;
    private String slug;

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
   
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
}
