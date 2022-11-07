package com.ssafy.exception;

public class WrongAccessException extends RuntimeException {
    public static final String CAN_NOT_UPDATE_MIDDLE_BUCKET = "다른 사람의 미들 버킷을 수정할 수 없습니다.";
    public static final String CAN_NOT_DELETE_MIDDLE_BUCKET = "다른 사람의 미들 버킷을 삭제할 수 없습니다.";
    public static final String CAN_NOT_UPDATE_ISSUE_TEMPLATE = "다른 사람의 이슈 템플릿을 수정할 수 없습니다.";
    public static final String CAN_NOT_DELETE_ISSUE_TEMPLATE = "다른 사람의 이슈 템플릿을 삭제할 수 없습니다.";
    public static final String CAN_NOT_UPDATE_MIDDLE_BUCKET_ISSUE = "다른 사람의 이슈를 수정할 수 없습니다.";
    public static final String CAN_NOT_DELETE_MIDDLE_BUCKET_ISSUE = "다른 사람의 이슈를 삭제할 수 없습니다.";
    public static final String WRONG_TOKEN_CODE = "잘못된 TOKEN CODE 입니다.";

    public WrongAccessException(String message) {
        super(message);
    }
}
