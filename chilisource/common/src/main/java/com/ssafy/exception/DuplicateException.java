package com.ssafy.exception;

public class DuplicateException extends RuntimeException{
    //public static final String FESTIVAL_DUPLICATED = "이미 존재하는 축제입니다.";
    public static final String MIDDLE_BUCKET_NAME_DUPLICATED = "이미 미들버킷에 해당 이름이 존재합니다.";
    public static final String WIDGET_CODE_DUPLICATED = "이미 존재하는 WIDGET CODE 입니다.";
    public static final String WIDGET_DUPLICATED = "이미 존재하는 WIDGET 입니다.";
    public static final String USER_PROJECT_DUPLICATED = "이미 존재하는 팀원 입니다.";

    public DuplicateException(String message){
        super(message);
    }
}
