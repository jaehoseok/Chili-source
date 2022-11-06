package com.ssafy.repository;

import com.ssafy.entity.TokenCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenCodeRepo extends JpaRepository<TokenCode, String> {
}