package com.ssafy.repository;

import com.ssafy.entity.Project;

import java.util.List;

public interface ProjectCustomRepo {
    List<Project> findProjectByUserId(Long userId);
}
