package com.project.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public final class ResponseBuilder {

    private ResponseBuilder() {}

    public static <T> ResponseEntity<ApiResponse<T>> success(
            String message,
            T data,
            HttpStatus status) {

        return ResponseEntity
                .status(status)
                .body(ApiResponse.success(message, data));
    }

    public static ResponseEntity<ApiResponse<Object>> failure(
            String message,
            HttpStatus status) {

        return ResponseEntity
                .status(status)
                .body(ApiResponse.failure(message));
    }
}
