package com.ssafy.service;

import com.ssafy.dto.request.UserProjectCreateRequest;
import com.ssafy.dto.request.UserProjectUpdateRequest;
import com.ssafy.dto.response.UserProjectResponse;
import com.ssafy.entity.Project;
import com.ssafy.entity.UserProject;
import com.ssafy.exception.NotFoundException;
import com.ssafy.repository.ProjectRepo;
import com.ssafy.repository.RoleRepo;
import com.ssafy.repository.UserProjectRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.exception.NotFoundException.PROJECT_NOT_FOUND;
import static com.ssafy.exception.NotFoundException.USER_PROJECT_NOT_FOUND;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class UserProjectServiceImpl implements UserProjectService {
    private final ProjectRepo projectRepo;
    private final UserProjectRepo userProjectRepo;
    private final RoleRepo roleRepo;
//    private final Role DEFAULT_ROLE = roleRepo.findById(2L).get();

    // 프로젝트 초대
    @Override
    @Transactional
    public void createUserProject(Long userId, UserProjectCreateRequest request) {
        // 프로젝트 존재 확인
        Project project = projectRepo.findById(request.getProjectId())
                .orElseThrow(() -> new NotFoundException(PROJECT_NOT_FOUND));
        // 유저 존재 확인

        // 초대 권한 확인
        UserProject userProjectManager = userProjectRepo.findByUserIdAndProjectId(userId, request.getProjectId())
                .orElseThrow(() -> new NotFoundException(USER_PROJECT_NOT_FOUND));
        if (userProjectManager.getRole().getInvite()) {
            // 프로젝트 초대
            UserProject userProject = UserProject.builder()
                    .userColor(request.getUserColor())
                    .userId(request.getUserId())
                    .project(project)
                    .role(null)
                    //                .role(DEFAULT_ROLE)
                    .build();
            userProjectRepo.save(userProject);
        }
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
        if (userProjectManager.getRole().getInvite()) {
            // 팀원 정보 수정
            userProject.update(request.getUserColor(), null);
            //        userProject.update(request.getUserColor(), roleRepo.findById(request.getRoleId()).get());
        }
    }

    // 프로젝트 팀원 조회
    @Override
    public List<UserProjectResponse> getUserProject(Long projectId) {
        // 팀원 리스트 조회
        List<UserProject> responses = userProjectRepo.findByProjectId(projectId);

        return responses.stream()
                .map(userProject -> UserProjectResponse.builder()
                        .userColor(userProject.getUserColor())
                        .userId(userProject.getUserId())
                        .projectId(userProject.getProject().getId())
                        .roleId(userProject.getRole().getId())
                        .build()
                ).collect(Collectors.toList());
    }


    // 프로젝트 나가기
    @Override
    @Transactional
    public int quitUserProject(Long userId, Long projectId) {
        // 프로젝트 소속 확인
        UserProject userProject = userProjectRepo.findByUserIdAndProjectId(userId, projectId)
                .orElseThrow(() -> new NotFoundException(USER_PROJECT_NOT_FOUND));
        // 마스터인지 확인
        if (userProject.getRole().getId() == 0) {
            return 1;
        }
        // 프로젝트 나가기
        userProjectRepo.delete(userProject);
        return 0;
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
        if (userProjectManager.getRole().getFire()) {
            // 강퇴
            userProjectRepo.delete(userProjectFire);
        }
    }
}
