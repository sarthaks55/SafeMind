package com.project.exception;

public class ProfessionalNotFoundException extends RuntimeException {
    public ProfessionalNotFoundException(String msg) {
        super(msg);
    }
}
