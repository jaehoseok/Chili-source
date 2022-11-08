package com.ssafy.service;

import com.ssafy.client.JiraClient;
import com.ssafy.config.JwtUtil;
import com.ssafy.dto.request.TokenCodeCreateRequest;
import com.ssafy.dto.request.TokenCodeUpdateRequest;
import com.ssafy.dto.request.TokenCreateRequest;
import com.ssafy.dto.response.JiraMySelfResponse;
import com.ssafy.dto.response.ServiceTokenResponse;
import com.ssafy.dto.response.TokenCodeResponse;
import com.ssafy.dto.response.TokenResponse;
import com.ssafy.entity.Auth;
import com.ssafy.entity.Token;
import com.ssafy.entity.TokenCode;
import com.ssafy.exception.InternalServerErrorException;
import com.ssafy.exception.NotFoundException;
import com.ssafy.exception.NotMatchException;
import com.ssafy.repository.AuthRepo;
import com.ssafy.repository.TokenCodeRepo;
import com.ssafy.repository.TokenRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.ssafy.exception.InternalServerErrorException.JIRA_COMMUNICATION_ERROR;
import static com.ssafy.exception.NotFoundException.*;
import static com.ssafy.exception.NotMatchException.AUTH_NOT_MATCH;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class AuthServiceImpl implements AuthService {
    private final AuthRepo authRepo;
    private final TokenRepo tokenRepo;
    private final TokenCodeRepo tokenCodeRepo;
    private final JiraClient jiraClient;
    private final JwtUtil jwtUtil;

    @Override
    @Transactional
    public ServiceTokenResponse refresh(String refreshToken, Long userId) {
        Auth auth = authRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(AUTH_NOT_FOUND));
        if (!auth.getRefreshToken().equals(refreshToken)) {
            throw new NotMatchException(AUTH_NOT_MATCH);
        }
        ServiceTokenResponse response = ServiceTokenResponse.builder()
                .accessToken(jwtUtil.createAccessToken(userId))
                .refreshToken(refreshToken)
                .build();
        return response;
    }

    @Override
    public List<TokenCodeResponse> getTokenCodeList() {
        List<TokenCodeResponse> tokenCodeResponses = tokenCodeRepo.findAll().stream()
                .map(tokenCode -> TokenCodeResponse.builder()
                        .id(tokenCode.getId())
                        .build())
                .collect(Collectors.toList());
        return tokenCodeResponses;
    }

    @Override
    @Transactional
    public void createTokenCode(TokenCodeCreateRequest request) {
        TokenCode tokenCode = TokenCode.builder()
                .id(request.getId().toUpperCase())
                .build();
        tokenCodeRepo.save(tokenCode);
    }

    @Override
    @Transactional
    public void updateTokenCode(String tokenCodeId, TokenCodeUpdateRequest request) {
        TokenCode tokenCode = tokenCodeRepo.findById(tokenCodeId)
                .orElseThrow(() -> new NotFoundException(TOKEN_CODE_NOT_FOUND));
        tokenCode.update(request.getId());
    }

    @Override
    @Transactional
    public void deleteTokenCode(String tokenCodeId) {
        TokenCode tokenCode = tokenCodeRepo.findById(tokenCodeId.toUpperCase())
                .orElseThrow(() -> new NotFoundException(TOKEN_CODE_NOT_FOUND));
        tokenCodeRepo.delete(tokenCode);
    }

    @Override
    public List<TokenResponse> getTokenList(Long userId) {
        List<TokenResponse> tokenResponses = tokenRepo.findByUserId(userId).stream()
                .map(token -> TokenResponse.builder()
                        .id(token.getId())
                        .value(token.getValue())
                        .email(token.getEmail())
                        .tokenCodeId(token.getTokenCode().getId())
                        .build())
                .collect(Collectors.toList());
        return tokenResponses;
    }

    @Override
    public TokenResponse getToken(String tokenCodeId, Long userId) {
        TokenCode tokenCode = tokenCodeRepo.findById(tokenCodeId.toUpperCase())
                .orElseThrow(() -> new NotFoundException(TOKEN_CODE_NOT_FOUND));
        Token token = tokenRepo.findByTokenCodeAndUserId(tokenCode, userId)
                .orElseThrow(() -> new NotFoundException(TOKEN_NOT_FOUND));
        return TokenResponse.builder()
                .id(token.getId())
                .value(token.getValue())
                .email(token.getEmail())
                .jiraAccountId(token.getJiraAccountId())
                .tokenCodeId(token.getTokenCode().getId())
                .build();
    }

    @Override
    @Transactional
    public void createToken(TokenCreateRequest request, Long userId) {
        TokenCode tokenCode = tokenCodeRepo.findById(request.getTokenCodeId().toUpperCase())
                .orElseThrow(() -> new NotFoundException(TOKEN_CODE_NOT_FOUND));
        Optional<Token> token = tokenRepo.findByTokenCodeAndUserId(tokenCode, userId);
        if ("JIRA".equals(tokenCode.getId())) {
            String jiraBase64 = "Basic " + Base64Utils.encodeToString((request.getEmail() + ":" + request.getValue()).getBytes());
            JiraMySelfResponse jiraMySelfResponse = jiraClient.findMySelf(jiraBase64);
            if (jiraMySelfResponse.getAccountId() == null)
                throw new InternalServerErrorException(JIRA_COMMUNICATION_ERROR);
            if (!token.isPresent()) {
                Token newToken = Token.builder()
                        .value(request.getValue())
                        .email(request.getEmail())
                        .jiraAccountId(jiraMySelfResponse.getAccountId())
                        .tokenCode(tokenCode)
                        .userId(userId)
                        .build();
                tokenRepo.save(newToken);
            } else {
                token.ifPresent(
                        findToken -> {
                            findToken.update(request.getValue(), request.getEmail());
                            findToken.updateJira(jiraMySelfResponse.getAccountId());
                        }

                );
            }
        } else {
            if (!token.isPresent()) {
                Token newToken = Token.builder()
                        .value(request.getValue())
                        .email(request.getEmail())
                        .tokenCode(tokenCode)
                        .userId(userId)
                        .build();
                tokenRepo.save(newToken);
            } else {
                token.ifPresent(findToken -> findToken.update(request.getValue(), request.getEmail()));
            }
        }
    }

    @Override
    @Transactional
    public void deleteToken(String tokenCodeId, Long userId) {
        TokenCode tokenCode = tokenCodeRepo.findById(tokenCodeId.toUpperCase())
                .orElseThrow(() -> new NotFoundException(TOKEN_CODE_NOT_FOUND));
        Token token = tokenRepo.findByTokenCodeAndUserId(tokenCode, userId)
                .orElseThrow(() -> new NotFoundException(TOKEN_NOT_FOUND));
        tokenRepo.delete(token);
    }
}
