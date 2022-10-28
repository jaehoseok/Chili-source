package com.ssafy.controller;

import com.ssafy.config.loginuser.LoginUser;
import com.ssafy.config.loginuser.User;
import com.ssafy.dto.request.UserProjectCreateRequest;
import com.ssafy.dto.request.UserProjectUpdateRequest;
import com.ssafy.dto.response.UserProjectResponse;
import com.ssafy.service.UserProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/team")
public class TeamController {
    private final UserProjectService userProjectService;

    // 프로젝트에 팀원 초대
    @PostMapping
    public ResponseEntity<?> inviteUserProject(
            @LoginUser User user,
            @RequestBody UserProjectCreateRequest request) {
        userProjectService.createUserProject(user.getId(), request);
        return ResponseEntity.ok()
                .build();
    }

    // 프로젝트 팀원 정보 수정
    @PutMapping
    public ResponseEntity<?> updateUserProject(
            @LoginUser User user,
            @RequestBody UserProjectUpdateRequest request) {
        userProjectService.updateUserProject(user.getId(), request);
        return ResponseEntity.ok()
                .build();
    }

    // 프로젝트 팀원 조회
    @GetMapping("/{projectId}")
    public ResponseEntity<?> getUserProjectList(
            @PathVariable Long projectId) {
        List<UserProjectResponse> responses = userProjectService.getUserProject(projectId);
        return ResponseEntity.ok()
                .body(responses);
    }

    // 프로젝트에서 나가기
    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> quitUserProject(
            @LoginUser User user,
            @PathVariable Long projectId) {
        int result = userProjectService.quitUserProject(user.getId(), projectId);
        if (result == 0) return ResponseEntity.ok().build();
        else return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    // 프로젝트에 팀원 강퇴
    @DeleteMapping("/fire")
    public ResponseEntity<?> fireUserProject(
            @LoginUser User user,
            @RequestParam Long projectId,
            @RequestParam Long fireUserId) {
        userProjectService.fireUserProject(user.getId(), projectId, fireUserId);
        return ResponseEntity.ok()
                .build();
    }
}
