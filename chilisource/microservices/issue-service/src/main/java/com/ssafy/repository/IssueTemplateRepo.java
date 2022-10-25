package com.ssafy.repository;

import com.ssafy.entity.IssueTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueTemplateRepo extends JpaRepository<IssueTemplate, Long> {
    List<IssueTemplate> findByProjectId(Long projectId);

    List<IssueTemplate> findByUserId(Long userId);

    List<IssueTemplate> findByProjectIdAndUserId(Long projectId, Long userId);
}
