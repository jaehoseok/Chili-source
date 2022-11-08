package com.ssafy.service;

import com.ssafy.client.UserServiceClient;
import com.ssafy.dto.request.UserProjectCreateRequest;
import com.ssafy.dto.request.UserProjectRoleUpdateRequest;
import com.ssafy.dto.request.UserProjectUpdateRequest;
import com.ssafy.dto.response.RoleResponse;
import com.ssafy.dto.response.UserProjectResponse;
import com.ssafy.dto.response.UserResponse;
import com.ssafy.entity.Project;
import com.ssafy.entity.Role;
import com.ssafy.entity.UserProject;
import com.ssafy.exception.DuplicateException;
import com.ssafy.exception.NotAuthorizedException;
import com.ssafy.exception.NotFoundException;
import com.ssafy.repository.ProjectRepo;
import com.ssafy.repository.RoleRepo;
import com.ssafy.repository.UserProjectRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.ssafy.exception.DuplicateException.USER_PROJECT_DUPLICATED;
import static com.ssafy.exception.NotAuthorizedException.*;
import static com.ssafy.exception.NotFoundException.*;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
@Slf4j
public class UserProjectServiceImpl implements UserProjectService {
    private final ProjectRepo projectRepo;
    private final UserProjectRepo userProjectRepo;
    private final RoleRepo roleRepo;
    private final UserServiceClient userServiceClient;

    // 프로젝트 초대
    @Override
    @Transactional
    public void createUserProject(Long userId, UserProjectCreateRequest request) {
        // 프로젝트 존재 확인
        Project project = projectRepo.findById(request.getProjectId())
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));

        // 유저 존재 확인
        List<Long> userIds = new ArrayList<>();
        userIds.add(request.getUserId());
        UserResponse userResponse;
        try {
            userResponse = userServiceClient.getUserList(userIds).get(0);
        } catch (Exception e) {
            throw new NotFoundException(USER_NOT_FOUND);
        }

        // 중복 여부 확인
        if (userProjectRepo.findByUserIdAndProjectId(request.getUserId(), request.getProjectId()).isPresent()) {
            throw new DuplicateException(USER_PROJECT_DUPLICATED);
        }

        // 초대 권한 확인
        UserProject userProjectManager = userProjectRepo.findByUserIdAndProjectId(userId, request.getProjectId())
                .orElseThrow(() -> new NotFoundException(USER_PROJECT_NOT_FOUND));
        if (!userProjectManager.getRole().getInvite()) {
            throw new NotAuthorizedException(INVITE_NOT_AUTHORIZED);
        }

        // 프로젝트 초대
        UserProject userProject = UserProject.builder()
                .userColor(request.getUserColor())
                .userId(request.getUserId())
                .project(project)
                .role(roleRepo.findById("DEVELOPER").get())
                .build();
        userProjectRepo.save(userProject);
    }

    // 프로젝트 팀원 정보 수정
    @Override
    @Transactional
    public void updateUserProject(Long userId, UserProjectUpdateRequest request) {
        // 팀원 존재 확인
        UserProject userProject = userProjectRepo.findByUserIdAndProjectId(request.getUserId(), request.getProjectId())
                .orElseThrow(() -> new NotFoundException(USER_PROJECT_NOT_FOUND));
        // 변경 권한 확인
        UserProject userProjectManager = userProjectRepo.findByUserIdAndProjectId(userId, request.getProjectId())
                .orElseThrow(() -> new NotFoundException(USER_PROJECT_NOT_FOUND));
        if (!userProjectManager.getRole().getModify()) {
            throw new NotAuthorizedException(MODIFY_NOT_AUTHORIZED);
        }
        // 팀원 정보 수정
        userProject.update(request.getUserColor());
    }

    // 프로젝트 팀원 권한 수정
    @Override
    @Transactional
    public void updateUserProjectRole(Long userId, UserProjectRoleUpdateRequest request) {
        // 팀원 존재 확인
        UserProject userProject = userProjectRepo.findByUserIdAndProjectId(request.getUserId(), request.getProjectId())
                .orElseThrow(() -> new NotFoundException(USER_PROJECT_NOT_FOUND));
        // 변경 권한 확인
        UserProject userProjectManager = userProjectRepo.findByUserIdAndProjectId(userId, request.getProjectId())
                .orElseThrow(() -> new NotFoundException(USER_PROJECT_NOT_FOUND));
        if (!userProjectManager.getRole().getModify()) {
            throw new NotAuthorizedException(MODIFY_NOT_AUTHORIZED);
        }

        Role role = roleRepo.findById(request.getRoleId().toUpperCase())
                .orElseThrow(() -> new NotFoundException(ROLE_NOT_FOUND));

        // 마스터 권한 위임 아니면서 본인 여부 확인
        if (!"MASTER".equalsIgnoreCase(role.getId()) && userId.equals(request.getUserId())) {
            throw new NotAuthorizedException(SELF_MODIFY_NOT_AUTHORIZED);
        }

        switch (userProjectManager.getRole().getId().toUpperCase()) {
            case "MASTER":
                // 마스터 권한 위임
                if ("MASTER".equalsIgnoreCase(role.getId())) {
                    userProjectManager.updateRole(roleRepo.findById("MAINTAINER").get());
                }
                break;
            case "MAINTAINER":
                if ("MASTER".equalsIgnoreCase(role.getId())) {
                    throw new NotAuthorizedException(MODIFY_HIGHER_AUTHORITY_NOT_AUTHORIZED);
                }
                break;
        }

        // 팀원 권한 수정
        userProject.updateRole(role);
    }

    // 프로젝트 팀원 목록 조회
    @Override
    public List<UserProjectResponse> getUserProjectList(Long projectId) {
        // 팀원 리스트 조회
        List<UserProject> responses = userProjectRepo.findByProjectId(projectId);

        List<Long> userIds = responses.stream()
                .map(UserProject::getUserId)
                .collect(Collectors.toList());

        List<UserResponse> userResponses;
        try {
            userResponses = userServiceClient.getUserList(userIds);
        } catch (Exception e) {
            throw new NotFoundException(USER_NOT_FOUND);
        }

        Map<Long, UserResponse> userMap = userResponses.stream()
                .collect(Collectors.toMap(UserResponse::getId, UserResponse::getThis));

        return responses.stream()
                .map(userProject -> {
                    UserResponse user = userMap.get(userProject.getUserId());
                    Role role = userProject.getRole();

                    return UserProjectResponse.builder()
                            .userColor(userProject.getUserColor())
                            .userId(userProject.getUserId())
                            .userName(user != null ? user.getName() : "없는 사용자입니다.")
                            .userImage(user != null ? user.getImage() : "없는 사용자입니다.")
                            .projectId(userProject.getProject().getId())
                            .role(RoleResponse.builder()
                                    .id(role.getId())
                                    .fire(role.getFire())
                                    .invite(role.getInvite())
                                    .modify(role.getModify())
                                    .remove(role.getRemove())
                                    .build())
                            .build();
                })
                .collect(Collectors.toList());
    }

    // 프로젝트 팀원 조회
    @Override
    public UserProjectResponse getUserProject(Long projectId, Long userId) {
        UserProject userProject = userProjectRepo.findByUserIdAndProjectId(userId, projectId)
                .orElseThrow(() -> new NotFoundException(USER_PROJECT_NOT_FOUND));

        List<Long> userIds = new ArrayList<>();
        userIds.add(userProject.getUserId());
        UserResponse userResponse;
        try {
            userResponse = userServiceClient.getUserList(userIds).get(0);
        } catch (Exception e) {
            throw new NotFoundException(USER_NOT_FOUND);
        }

        Role role = userProject.getRole();
        return UserProjectResponse.builder()
                .userColor(userProject.getUserColor())
                .userId(userProject.getUserId())
                .userName(userResponse.getName())
                .userImage(userResponse.getImage())
                .projectId(projectId)
                .role(RoleResponse.builder()
                        .id(role.getId())
                        .fire(role.getFire())
                        .invite(role.getInvite())
                        .modify(role.getModify())
                        .remove(role.getRemove())
                        .build())
                .build();
    }

    // 프로젝트 나가기
    @Override
    @Transactional
    public void quitUserProject(Long userId, Long projectId) {
        // 프로젝트 소속 확인
        UserProject userProject = userProjectRepo.findByUserIdAndProjectId(userId, projectId)
                .orElseThrow(() -> new NotFoundException(USER_PROJECT_NOT_FOUND));
        // 마스터인지 확인
        if (userProject.getRole().getId().equalsIgnoreCase("MASTER")) {
            throw new NotAuthorizedException(MASTER_NOT_AUTHORIZED);
        }
        // 프로젝트 나가기
        userProjectRepo.delete(userProject);
    }

    // 프로젝트 강퇴
    @Override
    @Transactional
    public void fireUserProject(Long userId, Long projectId, Long fireUserId) {
        // 팀원 존재 확인
        UserProject userProjectFire = userProjectRepo.findByUserIdAndProjectId(fireUserId, projectId)
                .orElseThrow(() -> new NotFoundException(USER_PROJECT_NOT_FOUND));
        // 강퇴 권한 확인
        UserProject userProjectManager = userProjectRepo.findByUserIdAndProjectId(userId, projectId)
                .orElseThrow(() -> new NotFoundException(USER_PROJECT_NOT_FOUND));
        if (!userProjectManager.getRole().getFire()) {
            throw new NotAuthorizedException(FIRE_NOT_AUTHORIZED);
        }
        // 강퇴
        userProjectRepo.delete(userProjectFire);
    }
}
