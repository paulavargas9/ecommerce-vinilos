package com.paula.vinilos.ecommerce_vinilos.dto;

import java.util.List;

public class CheckoutRequest {
    

    private String direccion;
    private Double total;
    private List<ItemDTO> items; // usamos la clase externa

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public List<ItemDTO> getItems() {
        return items;
    }

    public void setItems(List<ItemDTO> items) {
        this.items = items;
    }



}
