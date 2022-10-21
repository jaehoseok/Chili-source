package com.ssafy.exception;

public class DuplicateException extends RuntimeException{
    //public static final String FESTIVAL_DUPLICATED = "이미 존재하는 축제입니다.";

    public DuplicateException(String message){
        super(message);
    }
}
