package com.ssafy.service;

import com.ssafy.dto.request.TokenCodeCreateRequest;
import com.ssafy.dto.request.TokenCodeUpdateRequest;
import com.ssafy.dto.request.TokenCreateRequest;
import com.ssafy.dto.response.ServiceTokenResponse;
import com.ssafy.dto.response.TokenCodeResponse;
import com.ssafy.dto.response.TokenResponse;

import java.util.List;

public interface AuthService {
    //토큰 재발급
    public ServiceTokenResponse refresh(String refreshToken, Long userId);

    // 토큰 코드 리스트 조회
    public List<TokenCodeResponse> getTokenCodeList();

    // 토큰 코드 추가
    public void createTokenCode(TokenCodeCreateRequest request);

    // 토큰 코드 수정
    public void updateTokenCode(String tokenCodeId, TokenCodeUpdateRequest request);

    // 토큰 코드 삭제
    public void deleteTokenCode(String tokenCodeId);

    // 유저에 연결된 토큰 정보 반환
    public List<TokenResponse> getTokenList(Long userId);

    // 유저와 연결된 해당 토큰코드 값 반환
    public TokenResponse getToken(String tokenCodeId, Long userId);

    // 유저에 토큰 연동
    public void createToken(TokenCreateRequest request, Long userId);

    // 유저가 가진 토큰 삭제
    public void deleteToken(String tokenCodeId, Long userId);

}
