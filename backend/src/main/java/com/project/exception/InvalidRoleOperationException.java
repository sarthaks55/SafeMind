package com.project.exception;

public class InvalidRoleOperationException extends RuntimeException {
    public InvalidRoleOperationException(String msg) {
        super(msg);
    }
}
