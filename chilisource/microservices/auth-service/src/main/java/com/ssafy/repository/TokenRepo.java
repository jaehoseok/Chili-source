package com.ssafy.repository;

import com.ssafy.entity.Token;
import com.ssafy.entity.TokenCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TokenRepo extends JpaRepository<Token, Long> {
    List<Token> findByUserId(Long userId);

    Optional<Token> findByTokenCodeAndUserId(TokenCode tokenCode, Long userId);
}
