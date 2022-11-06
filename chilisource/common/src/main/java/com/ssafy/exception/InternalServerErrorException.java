package com.ssafy.exception;

public class InternalServerErrorException extends RuntimeException {
    public static final String AUTH_COMMUNICATION_ERROR = "토큰 서버와 통신에 실패했습니다.";
    public InternalServerErrorException(String message) {
        super(message);
    }
}
