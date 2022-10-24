package com.ssafy.repository;

import com.ssafy.entity.IssueType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueTypeRepo extends JpaRepository<IssueType, Long> {
}
