package com.ssafy.service;

import com.ssafy.dto.request.ProjectCreateRequest;
import com.ssafy.entity.Project;

import java.util.List;

public interface ProjectService {
    // 프로젝트 조회
    public List<Project> getProjectByUserId(Long userId);
    // 프로젝트 생성
    public void createProject(ProjectCreateRequest request, Long userId);
    // 프로젝트 내용 수정
    public void updateProject(ProjectCreateRequest request);
    // 프로젝트 삭제
    public void deleteProject(Long projectId);
}
