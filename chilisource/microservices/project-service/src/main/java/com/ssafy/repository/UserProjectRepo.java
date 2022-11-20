package com.ssafy.repository;

import com.ssafy.entity.UserProject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserProjectRepo extends JpaRepository<UserProject, Long> {
    Optional<UserProject> findByUserIdAndProjectId(Long userId, Long projectId);

    List<UserProject> findByProjectId(Long projectId);
}
