package com.ssafy.service;

import com.ssafy.dto.request.ProjectCreateRequest;
import com.ssafy.dto.request.ProjectTokenUpdateRequest;
import com.ssafy.dto.request.ProjectUpdateRequest;
import com.ssafy.dto.response.ProjectResponse;
import com.ssafy.entity.Project;
import com.ssafy.entity.UserProject;
import com.ssafy.exception.NotAuthorizedException;
import com.ssafy.exception.NotFoundException;
import com.ssafy.repository.ProjectRepo;
import com.ssafy.repository.RoleRepo;
import com.ssafy.repository.UserProjectRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.exception.NotAuthorizedException.REMOVE_NOT_AUTHORIZED;
import static com.ssafy.exception.NotFoundException.PROJECT_NOT_FOUND;
import static com.ssafy.exception.NotFoundException.USER_PROJECT_NOT_FOUND;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepo projectRepo;
    private final UserProjectRepo userProjectRepo;
    private final RoleRepo roleRepo;

    @Override
    public ProjectResponse getProject(Long projectId) {
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        return ProjectResponse.builder()
                .id(project.getId())
                .name(project.getName())
                .teamName(project.getDescription())
                .image(project.getImage())
                .jiraProject(project.getJiraProject())
                .build();
    }

    // 프로젝트 목록 조회
    @Override
    public List<ProjectResponse> getProjectByUserId(Long userId) {
        List<Project> responses = projectRepo.findProjectByUserId(userId);

        return responses.stream()
                .map(project -> ProjectResponse.builder()
                        .id(project.getId())
                        .name(project.getName())
                        .teamName(project.getDescription())
                        .image(project.getImage())
                        .jiraProject(project.getJiraProject())
                        .build())
                .collect(Collectors.toList());
    }

    // 프로젝트 생성
    @Override
    @Transactional
    public void createProject(ProjectCreateRequest request, Long userId) {
        Project project = Project.builder()
                .name(request.getName())
                .description(request.getDescription())
                .image(request.getImage())
                .build();
        projectRepo.save(project);

        UserProject userProject = UserProject.builder()
                .userId(userId)
                .project(project)
                .role(roleRepo.findById(1L).get())
                .build();
        userProjectRepo.save(userProject);

        return;
    }

    // 프로젝트 수정
    @Override
    @Transactional
    public void updateProject(ProjectUpdateRequest request) {
        Project project = projectRepo.findById(request.getId())
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        project.update(request.getName(), request.getDescription(), request.getImage());
    }

    // 프로젝트 삭제
    @Override
    @Transactional
    public void deleteProject(Long projectId, Long userId) {
        UserProject userProjectManager = userProjectRepo.findByUserIdAndProjectId(userId, projectId)
                .orElseThrow(() -> new NotFoundException(USER_PROJECT_NOT_FOUND));
        if (userProjectManager.getRole().getRemove()) {
            Project project = projectRepo.findById(projectId)
                    .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
            projectRepo.delete(project);
        } else {
            throw new NotAuthorizedException(REMOVE_NOT_AUTHORIZED);
        }
    }

    @Override
    public void createProjectToken(Long userId, ProjectTokenUpdateRequest request) {

    }

    @Override
    public void deleteProjectToken(Long userId, ProjectTokenUpdateRequest request) {

    }
}
