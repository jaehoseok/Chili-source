package com.ssafy.config;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.lang.reflect.Method;

@Slf4j
@Aspect
@Component
public class LogAopConfig {
    @Pointcut("execution(* com.ssafy.service..*.*(..))")
    private void cut(){}

    @Before("cut()")
    public void beforeParameterLog(JoinPoint joinPoint) {
        // 메서드 정보 받아오기
        Method method = getMethod(joinPoint);
        log.info("[Issue] [{}] START", method.getName());
    }

    @AfterReturning(value = "cut()")
    public void afterReturnLog(JoinPoint joinPoint) {
        // 메서드 정보 받아오기
        Method method = getMethod(joinPoint);
        log.info("[Issue] [{}] END", method.getName());
    }

    @AfterThrowing(value = "cut()", throwing = "exception")
    public void afterThrowingLog(JoinPoint joinPoint, Exception exception) throws IOException {
        // 메서드 정보 받아오기
        Method method = getMethod(joinPoint);
        log.error("[Issue] [{}] {}", method.getName(), exception.getMessage());
    }
    private Method getMethod(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        return signature.getMethod();
    }
}
