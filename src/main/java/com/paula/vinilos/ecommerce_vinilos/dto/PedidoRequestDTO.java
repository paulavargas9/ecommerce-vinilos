package com.paula.vinilos.ecommerce_vinilos.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class PedidoRequestDTO {

    @NotNull(message = "La fecha no puede ser nula")
    private LocalDateTime fecha;

    @NotNull(message = "El total no puede ser nulo")
    private Double total;

    @NotNull(message = "Debe especificarse el usuario")
    private Long usuarioId;

 
    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }

    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
}
