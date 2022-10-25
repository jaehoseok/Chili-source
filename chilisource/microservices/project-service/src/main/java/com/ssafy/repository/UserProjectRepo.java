package com.ssafy.repository;

import com.ssafy.entity.UserProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserProjectRepo extends JpaRepository<UserProject, Long>, UserProjectCustomRepo {
    Optional<UserProject> findByUserIdAndProjectId(Long userId, Long projectId);
    List<UserProject> findByProjectId(Long projectId);
}
