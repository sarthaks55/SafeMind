package com.project.exception;

public class DiaryNotFoundException extends RuntimeException {
    public DiaryNotFoundException(String msg) {
        super(msg);
    }
}
