package com.ssafy.exception;

public class NotAuthorizedException extends RuntimeException {
    public static final String CREATE_NOT_AUTHORIZED = "생성 권한이 없습니다.";
    public static final String MODIFY_NOT_AUTHORIZED = "변경 권한이 없습니다.";
    public static final String SELF_MODIFY_NOT_AUTHORIZED = "본인 권한 변경은 마스터 위임만 가능 합니다.";
    public static final String MODIFY_HIGHER_AUTHORITY_NOT_AUTHORIZED = "본인보다 상위 권한으로 변경 불가능 합니다.";
    public static final String INVITE_NOT_AUTHORIZED = "초대 권한이 없습니다.";
    public static final String FIRE_NOT_AUTHORIZED = "강퇴 권한이 없습니다.";
    public static final String REMOVE_NOT_AUTHORIZED = "삭제 권한이 없습니다.";
    public static final String MASTER_NOT_AUTHORIZED = "마스터 상태에서는 불가능합니다.";
    public NotAuthorizedException(String message) {
        super(message);
    }
}
