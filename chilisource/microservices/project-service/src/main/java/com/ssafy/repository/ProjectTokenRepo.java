package com.ssafy.repository;

import com.ssafy.entity.ProjectToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectTokenRepo extends JpaRepository<ProjectToken, Long>, ProjectTokenCustomRepo {
}
