package com.ssafy.repository;

import com.ssafy.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TokenRepo extends JpaRepository<Token, Long> {
    List<Token> findByUserId(Long userId);
    Optional<Token> findByTokenCodeIdAndUserId(Long tokenCodeId, Long userId);
}
