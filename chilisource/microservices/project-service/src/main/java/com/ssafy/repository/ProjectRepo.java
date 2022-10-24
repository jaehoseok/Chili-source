package com.ssafy.repository;

import com.ssafy.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepo extends JpaRepository<Project, Long>, ProjectCustomRepo {
}
