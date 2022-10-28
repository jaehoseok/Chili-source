package com.ssafy.service;

import com.ssafy.dto.request.UserProjectCreateRequest;
import com.ssafy.dto.request.UserProjectUpdateRequest;
import com.ssafy.dto.response.UserProjectResponse;

import java.util.List;

public interface UserProjectService {
    // 프로젝트 초대
    public void createUserProject(Long userId, UserProjectCreateRequest request);

    // 프로젝트 팀원 정보 수정
    public void updateUserProject(Long userId, UserProjectUpdateRequest request);

    // 프로젝트 팀원 조회
    public List<UserProjectResponse> getUserProject(Long projectId);

    // 프로젝트 나가기
    public int quitUserProject(Long userId, Long projectId);

    // 프로젝트 강퇴
    public void fireUserProject(Long userId, Long projectId, Long fireUserId);
}
