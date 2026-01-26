package com.project.exception;

public class InvalidAppointmentActionException extends RuntimeException {
    public InvalidAppointmentActionException(String msg) {
        super(msg);
    }
}
