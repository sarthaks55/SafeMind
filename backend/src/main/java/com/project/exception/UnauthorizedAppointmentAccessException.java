package com.project.exception;

public class UnauthorizedAppointmentAccessException extends RuntimeException {
    public UnauthorizedAppointmentAccessException(String msg) {
        super(msg);
    }
}
