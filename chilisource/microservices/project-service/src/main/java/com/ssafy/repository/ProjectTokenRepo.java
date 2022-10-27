package com.ssafy.repository;

import com.ssafy.entity.ProjectGit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectTokenRepo extends JpaRepository<ProjectGit, Long>, ProjectTokenCustomRepo {
}
