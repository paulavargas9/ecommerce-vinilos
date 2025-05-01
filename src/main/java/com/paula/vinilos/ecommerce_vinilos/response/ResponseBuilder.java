package com.paula.vinilos.ecommerce_vinilos.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseBuilder {

    // (200 OK)
    public static <T> ResponseEntity<ApiResponse<T>> ok(String message, T data) {
        ApiResponse<T> response = new ApiResponse<>(HttpStatus.OK.value(), message, data);
        return ResponseEntity.ok(response);
    }

    public static <T> ResponseEntity<ApiResponse<T>> noContent(String message) {
        ApiResponse<T> response = new ApiResponse<>(HttpStatus.NO_CONTENT.value(), message, null);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(response);
    }

    public static <T> ResponseEntity<ApiResponse<T>> created(String message, T data) {
        ApiResponse<T> response = new ApiResponse<>(HttpStatus.CREATED.value(), message, data);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    public static <T> ResponseEntity<ApiResponse<Void>> deleted(String message) {
        ApiResponse<Void> response = new ApiResponse<>(HttpStatus.OK.value(), message, null);
        return ResponseEntity.ok(response);
    }
}
