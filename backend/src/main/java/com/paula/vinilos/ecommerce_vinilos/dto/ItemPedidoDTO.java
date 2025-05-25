package com.paula.vinilos.ecommerce_vinilos.dto;

public class ItemPedidoDTO {
    private String nombreProducto;
    private Integer cantidad;
    private Double precio;

    public String getNombreProducto() { return nombreProducto; }
    public void setNombreProducto(String nombreProducto) { this.nombreProducto = nombreProducto; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }

    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }
}
