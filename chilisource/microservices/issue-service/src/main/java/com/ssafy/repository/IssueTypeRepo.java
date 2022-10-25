package com.ssafy.repository;

import com.ssafy.entity.IssueType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IssueTypeRepo extends JpaRepository<IssueType, Long> {
    Optional<IssueType> findByName(String name);
}
