package com.project.exception;

public class MoodNotFoundException extends RuntimeException {
    public MoodNotFoundException(String msg) {
        super(msg);
    }
}