package com.paula.vinilos.ecommerce_vinilos.dto;

import java.time.LocalDate;
import java.util.List;

public class PedidoResumenDTO {
    private LocalDate fecha;
    private Double total;
    private String estado;
    private List<ItemPedidoDTO> items;

    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }

    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public List<ItemPedidoDTO> getItems() { return items; }
    public void setItems(List<ItemPedidoDTO> items) { this.items = items; }
}
