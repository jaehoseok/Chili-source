package com.ssafy.service;

import com.ssafy.config.JwtUtil;
import com.ssafy.dto.request.TokenCodeCreateRequest;
import com.ssafy.dto.request.TokenCodeUpdateRequest;
import com.ssafy.dto.request.TokenCreateRequest;
import com.ssafy.dto.response.ServiceTokenResponse;
import com.ssafy.dto.response.TokenCodeResponse;
import com.ssafy.dto.response.TokenResponse;
import com.ssafy.entity.Auth;
import com.ssafy.entity.Token;
import com.ssafy.entity.TokenCode;
import com.ssafy.exception.NotFoundException;
import com.ssafy.exception.NotMatchException;
import com.ssafy.repository.AuthRepo;
import com.ssafy.repository.TokenCodeRepo;
import com.ssafy.repository.TokenRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.ssafy.exception.NotFoundException.AUTH_NOT_FOUND;
import static com.ssafy.exception.NotFoundException.TOKEN_CODE_NOT_FOUND;
import static com.ssafy.exception.NotMatchException.AUTH_NOT_MATCH;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthServiceImpl implements AuthService {
    private final AuthRepo authRepo;
    private final TokenRepo tokenRepo;
    private final TokenCodeRepo tokenCodeRepo;
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
        return null;
    }

    @Override
    public List<TokenCodeResponse> findTokenCodeList() {
        List<TokenCodeResponse> tokenCodeResponses = tokenCodeRepo.findAll().stream()
                .map(tokenCode -> {
                    return TokenCodeResponse.builder()
                            .id(tokenCode.getId())
                            .name(tokenCode.getName())
                            .build();
                })
                .collect(Collectors.toList());
        return tokenCodeResponses;
    }

    @Override
    @Transactional
    public void createTokenCode(TokenCodeCreateRequest request) {
        TokenCode tokenCode = TokenCode.builder()
                .name(request.getName())
                .build();
        tokenCodeRepo.save(tokenCode);
    }

    @Override
    @Transactional
    public void updateTokenCode(Long tokenCodeId, TokenCodeUpdateRequest request) {
        TokenCode tokenCode = tokenCodeRepo.findById(tokenCodeId)
                .orElseThrow(() -> new NotFoundException(TOKEN_CODE_NOT_FOUND));
        tokenCode.update(request.getName());
    }

    @Override
    @Transactional
    public void deleteTokenCode(Long tokenCodeId) {
        TokenCode tokenCode = tokenCodeRepo.findById(tokenCodeId)
                .orElseThrow(() -> new NotFoundException(TOKEN_CODE_NOT_FOUND));
        tokenCodeRepo.delete(tokenCode);
    }

    @Override
    public List<TokenResponse> findToken(Long userId) {
        List<TokenResponse> tokenResponses = tokenRepo.findByUserId(userId).stream()
                .map(token -> {
                    return TokenResponse.builder()
                            .id(token.getId())
                            .value(token.getValue())
                            .tokenCodeId(token.getTokenCode().getId())
                            .build();
                })
                .collect(Collectors.toList());
        return tokenResponses;
    }

    @Override
    @Transactional
    public void createToken(TokenCreateRequest request, Long userId) {
        TokenCode tokenCode = tokenCodeRepo.findById(request.getTokenCodeId())
                .orElseThrow(() -> new NotFoundException(TOKEN_CODE_NOT_FOUND));
        Optional<Token> token = tokenRepo.findByTokenCodeIdAndUserId(tokenCode.getId(), userId);
        if (!token.isPresent()) {
            Token newToken = Token.builder()
                    .value(request.getValue())
                    .tokenCode(tokenCode)
                    .build();
            tokenRepo.save(newToken);
        } else {
            token.ifPresent(findToken -> findToken.update(request.getValue()));
        }
    }

    @Override
    @Transactional
    public void deleteToken(Long tokenCodeId, Long userId) {
        Token token = tokenRepo.findByTokenCodeIdAndUserId(tokenCodeId, userId)
                .orElseThrow(() -> new NotFoundException(TOKEN_CODE_NOT_FOUND));
        tokenRepo.delete(token);
    }


}
