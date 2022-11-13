package com.ssafy.exception;

public class InternalServerErrorException extends RuntimeException {
    public static final String AUTH_COMMUNICATION_ERROR = "토큰 서버와 통신에 실패했습니다.";
    public static final String PROJECT_COMMUNICATION_ERROR = "프로젝트 서버와 통신에 실패했습니다.";
    public static final String GIT_COMMUNICATION_ERROR = "깃 서버와 통신에 실패했습니다.";
    public static final String JIRA_COMMUNICATION_ERROR = "지라 서버와 통신에 실패했습니다.";
    public InternalServerErrorException(String message) {
        super(message);
    }
}
