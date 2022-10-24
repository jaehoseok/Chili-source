package com.ssafy.exception;

public class NotFoundException extends RuntimeException {
    public static final String PROJECT_NOT_FOUND = "존재하지 않는 프로젝트입니다.";
    public static final String ISSUE_TYPE_NOT_FOUND = "존재하지 않는 이슈 타입입니다.";

    public NotFoundException(String message) {
        super(message);
    }
}
