package com.ssafy.controller;

import com.ssafy.config.loginuser.LoginUser;
import com.ssafy.config.loginuser.User;
import com.ssafy.dto.request.UserProjectCreateRequest;
import com.ssafy.dto.request.UserProjectRoleUpdateRequest;
import com.ssafy.dto.request.UserProjectUpdateRequest;
import com.ssafy.dto.response.UserProjectResponse;
import com.ssafy.service.UserProjectService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/team")
@Api(tags = "팀원")
public class TeamController {
    private final UserProjectService userProjectService;

    // 프로젝트에 팀원 초대
    @PostMapping
    @ApiOperation(value = "프로젝트에 팀원 초대")
    public ResponseEntity<?> inviteUserProject(
            @LoginUser User user,
            @RequestBody UserProjectCreateRequest request) {
        userProjectService.createUserProject(user.getId(), request);
        return ResponseEntity.ok()
                .build();
    }

    // 프로젝트 팀원 정보 수정
    @PutMapping
    @ApiOperation(value = "프로젝트 팀원 정보 수정")
    public ResponseEntity<?> updateUserProject(
            @LoginUser User user,
            @RequestBody UserProjectUpdateRequest request) {
        userProjectService.updateUserProject(user.getId(), request);
        return ResponseEntity.ok()
                .build();
    }

    // 프로젝트 팀원 권한 수정
    @PutMapping("/role")
    @ApiOperation(value = "프로젝트 팀원 권한 수정")
    public ResponseEntity<?> updateUserProjectRole(
            @LoginUser User user,
            @RequestBody UserProjectRoleUpdateRequest request) {
        userProjectService.updateUserProjectRole(user.getId(), request);
        return ResponseEntity.ok()
                .build();
    }

    // 프로젝트 팀원 조회
    @GetMapping("/{projectId}")
    @ApiOperation(value = "프로젝트 팀원 목록 조회")
    public ResponseEntity<List<UserProjectResponse>> getUserProjectList(
            @ApiParam(value = "프로젝트 pk") @PathVariable Long projectId) {
        List<UserProjectResponse> responses = userProjectService.getUserProjectList(projectId);
        return ResponseEntity.ok()
                .body(responses);
    }

    // 프로젝트 팀원 한 명 조회
    @GetMapping("/{projectId}/{userId}")
    @ApiOperation(value = "프로젝트 팀원 조회")
    public ResponseEntity<UserProjectResponse> getUserProject(
            @ApiParam(value = "프로젝트 pk") @PathVariable Long projectId,
            @ApiParam(value = "유저 pk") @PathVariable Long userId) {
        UserProjectResponse responses = userProjectService.getUserProject(projectId, userId);
        return ResponseEntity.ok()
                .body(responses);
    }

    // 프로젝트에서 나가기
    @DeleteMapping("/{projectId}")
    @ApiOperation(value = "프로젝트 나가기")
    public ResponseEntity<?> quitUserProject(
            @LoginUser User user,
            @ApiParam(value = "프로젝트 pk") @PathVariable Long projectId) {
        userProjectService.quitUserProject(user.getId(), projectId);
        return ResponseEntity.ok()
                .build();
    }

    // 프로젝트에 팀원 강퇴
    @DeleteMapping("/fire")
    @ApiOperation(value = "프로젝트 팀원 강퇴")
    public ResponseEntity<?> fireUserProject(
            @LoginUser User user,
            @ApiParam(value = "프로젝트 pk") @RequestParam Long projectId,
            @ApiParam(value = "강퇴할 유저 pk") @RequestParam Long fireUserId) {
        userProjectService.fireUserProject(user.getId(), projectId, fireUserId);
        return ResponseEntity.ok()
                .build();
    }
}
