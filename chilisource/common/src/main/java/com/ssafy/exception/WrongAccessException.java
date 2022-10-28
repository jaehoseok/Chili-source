package com.ssafy.exception;

public class WrongAccessException extends RuntimeException {
    public WrongAccessException(String message) {
        super(message);
    }
}
