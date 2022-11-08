package com.ssafy.service;

import com.ssafy.config.loginuser.User;
import com.ssafy.dto.request.ProjectCreateRequest;
import com.ssafy.dto.request.ProjectTokenUpdateRequest;
import com.ssafy.dto.request.ProjectUpdateRequest;
import com.ssafy.dto.response.ProjectResponse;

import java.util.List;

public interface ProjectService {
    // 프로젝트 조회
    public ProjectResponse getProject(Long projectId);

    // 프로젝트 목록 조회
    public List<ProjectResponse> getProjectByUserId(Long userId);

    // 프로젝트 생성
    public Long createProject(ProjectCreateRequest request, String image, Long userId);

    // 프로젝트 내용 수정
    public void updateProject(ProjectUpdateRequest request);

    public void updateProjectImage(String image, Long projectId, Long userId);

    // 프로젝트 삭제
    public void deleteProject(Long projectId, Long userId, List<String> auths);

    // 프로젝트 마스터 토큰 연동
    public void updateProjectToken(User user, ProjectTokenUpdateRequest request, List<String> auths);

    // 프로젝트 마스터 토큰 연동 해제
    public void deleteProjectToken(User user, Long projectId, String name);
}
