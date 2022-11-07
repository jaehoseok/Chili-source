package com.ssafy.service;

import com.ssafy.client.AuthServiceClient;
import com.ssafy.client.IssueServiceClient;
import com.ssafy.client.WidgetServiceClient;
import com.ssafy.config.loginuser.User;
import com.ssafy.dto.request.ProjectCreateRequest;
import com.ssafy.dto.request.ProjectTokenUpdateRequest;
import com.ssafy.dto.request.ProjectUpdateRequest;
import com.ssafy.dto.response.ProjectResponse;
import com.ssafy.dto.response.TokenResponse;
import com.ssafy.entity.Project;
import com.ssafy.entity.UserProject;
import com.ssafy.exception.NotAuthorizedException;
import com.ssafy.exception.NotFoundException;
import com.ssafy.exception.WrongAccessException;
import com.ssafy.repository.ProjectRepo;
import com.ssafy.repository.RoleRepo;
import com.ssafy.repository.UserProjectRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.exception.NotAuthorizedException.*;
import static com.ssafy.exception.NotFoundException.*;
import static com.ssafy.exception.WrongAccessException.WRONG_TOKEN_CODE;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
@Slf4j
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepo projectRepo;
    private final UserProjectRepo userProjectRepo;
    private final RoleRepo roleRepo;
    private final AuthServiceClient authServiceClient;
    private final IssueServiceClient issueServiceClient;
    private final WidgetServiceClient widgetServiceClient;
    private final String DEFAULT_COLOR = "FFFFFF";

    @Override
    public ProjectResponse getProject(Long projectId) {
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> {
                    log.error("[Project] [getProject] PROJECT_NOT_FOUND");
                    return new NotFoundException(PROJECT_NOT_FOUND);
                });

        return ProjectResponse.builder()
                .id(project.getId())
                .name(project.getName())
                .description(project.getDescription())
                .image(project.getImage())
                .latestGanttVersion(project.getLatestGanttVersion())
                .jiraProject(project.getJiraProject())
                .gitRepo(project.getGitRepo())
                .tokenList(getTokenList(project))
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
                        .description(project.getDescription())
                        .image(project.getImage())
                        .latestGanttVersion(project.getLatestGanttVersion())
                        .jiraProject(project.getJiraProject())
                        .gitRepo(project.getGitRepo())
                        .tokenList(getTokenList(project))
                        .build())
                .collect(Collectors.toList());
    }

    // 프로젝트 생성
    @Override
    @Transactional
    public void createProject(ProjectCreateRequest request, String image,Long userId) {
        Project project = Project.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();
        projectRepo.save(project);

        project.updateImage(image);

        UserProject userProject = UserProject.builder()
                .userId(userId)
                .project(project)
                .userColor(DEFAULT_COLOR)
                .role(roleRepo.findById("MASTER").get())
                .build();
        userProjectRepo.save(userProject);
    }

    // 프로젝트 수정
    @Override
    @Transactional
    public void updateProject(ProjectUpdateRequest request) {
        Project project = projectRepo.findById(request.getId())
                .orElseThrow(() -> {
                    log.error("[Project] [updateProject] PROJECT_NOT_FOUND");
                   return new NotFoundException(PROJECT_NOT_FOUND);
                }
                );
        project.update(request.getName(), request.getDescription());
    }

    @Override
    public void updateProjectImage(String image, Long projectId, Long userId) {
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> {
                    log.error("[Project] [updateProjectImage] PROJECT_NOT_FOUND");
                    return new NotFoundException(PROJECT_NOT_FOUND);
                });

        UserProject userProjectManager = userProjectRepo.findByUserIdAndProjectId(userId, projectId)
                .orElseThrow(() -> {
                    log.error("[Project] [updateProjectImage] USER_PROJECT_NOT_FOUND");
                    return new NotFoundException(USER_PROJECT_NOT_FOUND);
                });

        if (!userProjectManager.getRole().getModify()) {
            log.error("[Project] [updateProjectImage] MODIFY_NOT_AUTHORIZED");
            throw new NotAuthorizedException(MODIFY_NOT_AUTHORIZED);
        }

        project.updateImage(image);
    }

    // 프로젝트 삭제
    @Override
    @Transactional
    public void deleteProject(Long projectId, Long userId, List<String> auths) {
        UserProject userProjectManager = userProjectRepo.findByUserIdAndProjectId(userId, projectId)
                .orElseThrow(() -> {
                    log.error("[Project] [deleteProject] USER_PROJECT_NOT_FOUND");
                    return new NotFoundException(USER_PROJECT_NOT_FOUND);
                });
        if (userProjectManager.getRole().getRemove()) {
            Project project = projectRepo.findById(projectId)
                    .orElseThrow(() -> {
                        log.error("[Project] [deleteProject] PROJECT_NOT_FOUND");
                        return new NotFoundException(PROJECT_NOT_FOUND);
                    });
            projectRepo.delete(project);
            issueServiceClient.deleteAll(auths, projectId);
            widgetServiceClient.deleteAllWidget(projectId);
        } else {
            log.error("[Project] [deleteProject] REMOVE_NOT_AUTHORIZED");
            throw new NotAuthorizedException(REMOVE_NOT_AUTHORIZED);
        }
    }

    @Override
    @Transactional
    public void updateProjectToken(User user, ProjectTokenUpdateRequest request, List<String> auths) {
        Project project = projectRepo.findById(request.getProjectId())
                .orElseThrow(() -> {
                    log.error("[Project] [updateProjectToken] PROJECT_NOT_FOUND");
                    return new NotFoundException(PROJECT_NOT_FOUND);
                });

        UserProject userProjectManager = userProjectRepo.findByUserIdAndProjectId(user.getId(), request.getProjectId())
                .orElseThrow(() -> {
                    log.error("[Project] [updateProjectToken] USER_PROJECT_NOT_FOUND");
                    return new NotFoundException(USER_PROJECT_NOT_FOUND);
                });

        if (!userProjectManager.getRole().getId().equalsIgnoreCase("MASTER")) {
            log.error("[Project] [updateProjectToken] CREATE_NOT_AUTHORIZED");
            throw new NotAuthorizedException(CREATE_NOT_AUTHORIZED);
        }

        TokenResponse tokenResponse;
        try{
            tokenResponse = authServiceClient.getToken(auths, request.getName());
        } catch (Exception e) {
            log.error("[Project] [updateProjectToken] WRONG_TOKEN_CODE");
            throw new WrongAccessException(WRONG_TOKEN_CODE);
        }

        switch (request.getName().toUpperCase()) {
            case "JIRA":
                project.updateJira(tokenResponse.getValue(), request.getDetail(), tokenResponse.getJiraAccountId(), tokenResponse.getEmail());
                break;
            case "GIT":
            case "SSAFYGITLAB":
                project.updateGit(tokenResponse.getValue(), request.getDetail());
                break;
            default:
                log.error("[Project] [updateProjectToken] TOKEN_CODE_NOT_FOUND");
                throw new NotFoundException(TOKEN_CODE_NOT_FOUND);
        }
    }

    @Override
    @Transactional
    public void deleteProjectToken(User user, Long projectId, String name) {
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> {
                    log.error("[Project] [deleteProjectToken] PROJECT_NOT_FOUND");
                    return new NotFoundException(PROJECT_NOT_FOUND);
                });

        UserProject userProjectManager = userProjectRepo.findByUserIdAndProjectId(user.getId(), projectId)
                .orElseThrow(() -> {
                    log.error("[Project] [deleteProjectToken] USER_PROJECT_NOT_FOUND");
                    return new NotFoundException(USER_PROJECT_NOT_FOUND);
                });

        if (!userProjectManager.getRole().getId().equalsIgnoreCase("MASTER")) {
            log.error("[Project] [deleteProjectToken] REMOVE_NOT_AUTHORIZED");
            throw new NotAuthorizedException(REMOVE_NOT_AUTHORIZED);
        }

        switch (name.toUpperCase()) {
            case "JIRA":
                project.deleteJira();
                break;
            case "GIT":
            case "SSAFYGITLAB":
                project.deleteGit();
                break;
            default:
                log.error("[Project] [deleteProjectToken] TOKEN_CODE_NOT_FOUND");
                throw new NotFoundException(TOKEN_CODE_NOT_FOUND);
        }
    }

    private List<String> getTokenList(Project project) {
        List<String> tokenList = new ArrayList<>();

        if (project.getJiraToken() != null) tokenList.add("JIRA");
        if (project.getGitToken() != null) tokenList.add("GIT");

        return tokenList;
    }
}
