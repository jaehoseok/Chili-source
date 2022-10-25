package com.ssafy.repository;

import com.ssafy.entity.ProjectGit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectTokenRepo extends JpaRepository<ProjectGit, Long>, ProjectTokenCustomRepo {
}
