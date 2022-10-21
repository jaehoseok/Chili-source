package com.ssafy.exception;

public class NotFoundException extends RuntimeException {
    //public static final String FESTIVAL_NOT_FOUND = "존재하지 않는 축제입니다.";
    public NotFoundException(String message) {
        super(message);
    }
}
