package com.project.exception;

public class SlotAlreadyBookedException extends RuntimeException {
    public SlotAlreadyBookedException(String msg) {
        super(msg);
    }
}
