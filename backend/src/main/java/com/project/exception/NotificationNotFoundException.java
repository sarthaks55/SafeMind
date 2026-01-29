package com.project.exception;

public class NotificationNotFoundException extends RuntimeException {
    public NotificationNotFoundException(String msg) {
        super(msg);
    }
}
