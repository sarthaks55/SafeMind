package com.project.exception;

public class UnauthorizedDiaryAccessException extends RuntimeException {
    public UnauthorizedDiaryAccessException(String msg) {
        super(msg);
    }
}
