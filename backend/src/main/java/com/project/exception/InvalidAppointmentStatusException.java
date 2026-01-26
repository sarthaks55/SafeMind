package com.project.exception;

public class InvalidAppointmentStatusException extends RuntimeException {
    public InvalidAppointmentStatusException(String msg) {
        super(msg);
    }
}
