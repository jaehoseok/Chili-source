package com.ssafy.repository;

import com.ssafy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthRepo extends JpaRepository<User, Long> {
    Optional<User> findByGoogle(String google);
    Optional<User> findByNaver(String naver);
    Optional<User> findByKakao(String kakao);
}
