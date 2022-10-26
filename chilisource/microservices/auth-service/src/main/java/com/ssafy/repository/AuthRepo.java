package com.ssafy.repository;

import com.ssafy.entity.Auth;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AuthRepo extends CrudRepository<Auth, Long> {
    Optional<Auth> findById(Long userId);
}
