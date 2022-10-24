package com.ssafy.service;

import com.ssafy.dto.request.ProjectCreateRequest;
import com.ssafy.entity.Project;
import com.ssafy.exception.NotFoundException;
import com.ssafy.repository.ProjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.ssafy.exception.NotFoundException.PROJECT_NOT_FOUND;

@Service
public class ProjectServiceImpl implements ProjectService {
    @Autowired
    ProjectRepo projectRepo;

    // 프로젝트 조회
    @Override
    public List<Project> getProjectByUserId(Long userId) {
        return projectRepo.findProjectByUserId(userId);
    }

    // 프로젝트 생성
    @Override
    public void createProject(ProjectCreateRequest request, Long userId) {
        Project project = Project.builder()
                .name(request.getName())
                .teamName(request.getName())
                .image(request.getImage())
                .build();

        return;
    }

    // 프로젝트 수정
    @Override
    public void updateProject(ProjectCreateRequest request) {
        Project project = projectRepo.findById(request.getId())
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        project.update(request.getName(), request.getTeamName(), request.getImage());
    }

    // 프로젝트 삭제
    @Override
    public void deleteProject(Long projectId) {
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        projectRepo.delete(project);
    }
}
