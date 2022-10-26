package com.ssafy.repository;

import com.ssafy.entity.TokenCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenCodeRepo extends JpaRepository<TokenCode, Long> {
}