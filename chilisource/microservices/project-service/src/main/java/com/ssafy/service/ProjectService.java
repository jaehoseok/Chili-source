package com.ssafy.service;

import com.ssafy.dto.request.ProjectCreateRequest;
import com.ssafy.dto.request.ProjectUpdateRequest;
import com.ssafy.dto.response.ProjectResponse;

import java.util.List;

public interface ProjectService {
    // 프로젝트 조회
    public ProjectResponse getProject(Long projectId);
    // 프로젝트 목록 조회
    public List<ProjectResponse> getProjectByUserId(Long userId);
    // 프로젝트 생성
    public void createProject(ProjectCreateRequest request, Long userId);
    // 프로젝트 내용 수정
    public void updateProject(ProjectUpdateRequest request);
    // 프로젝트 삭제
    public void deleteProject(Long projectId, Long userId);
}
