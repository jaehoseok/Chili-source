package com.ssafy.repository;

import com.ssafy.entity.Wigget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WiggetRepo extends JpaRepository<Wigget, Long> {
}
