package com.paula.vinilos.ecommerce_vinilos.dto;

import java.time.LocalDateTime;

public class PedidoResponseDTO {

    private Long id;
    private LocalDateTime fecha;
    private Double total;
    private Long usuarioId;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }

    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
}
