package com.ssafy.repository;

import com.ssafy.entity.MiddleBucket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MiddleBucketRepo extends JpaRepository<MiddleBucket, Long> {
    List<MiddleBucket> findByProjectId(Long projectId);

    List<MiddleBucket> findByUserId(Long userId);

    List<MiddleBucket> findByProjectIdAndUserId(Long projectId, Long userId);
}
