package com.project.exception;

public class MoodAlreadyExistsException extends RuntimeException {
    public MoodAlreadyExistsException(String msg) {
        super(msg);
    }
}
