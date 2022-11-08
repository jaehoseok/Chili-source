package com.ssafy.controller;

import com.ssafy.config.AwsS3Service;
import com.ssafy.config.loginuser.LoginUser;
import com.ssafy.config.loginuser.User;
import com.ssafy.dto.request.ProjectCreateRequest;
import com.ssafy.dto.request.ProjectTokenUpdateRequest;
import com.ssafy.dto.request.ProjectUpdateRequest;
import com.ssafy.dto.response.ProjectResponse;
import com.ssafy.service.ProjectService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/project")
@Api(tags = "프로젝트")
public class ProjectController {
    private static final String baseURL = "https://chilisource.s3.ap-northeast-2.amazonaws.com/";
    private static final String defaultImage = "ee0802f5-ef53-47af-8165-89e000595b15.png";
    private final AwsS3Service awsS3Service;
    private final ProjectService projectService;

    // 프로젝트 조회
    @GetMapping("/{projectId}")
    @ApiOperation(value = "프로젝트 조회")
    public ResponseEntity<ProjectResponse> getProject(
            @ApiParam(value = "프로젝트 pk", required = true) @PathVariable Long projectId) {
        ProjectResponse response = projectService.getProject(projectId);
        return ResponseEntity.ok(response);
    }

    // 프로젝트 목록 조회
    @GetMapping
    @ApiOperation(value = "프로젝트 목록 조회")
    public ResponseEntity<List<ProjectResponse>> getProjectByUserId(
            @LoginUser User user) {
        List<ProjectResponse> responses = projectService.getProjectByUserId(user.getId());
        return ResponseEntity.ok(responses);
    }

    // 프로젝트 생성
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation(value = "프로젝트 생성")
    public ResponseEntity<?> createProject(
            @RequestPart ProjectCreateRequest request,
            @RequestPart(value = "image", required = false) final MultipartFile file,
            @LoginUser User user) {
        String projectImage;
        if (file != null) projectImage = awsS3Service.uploadFile(file, "project/");
        else projectImage = defaultImage;
        Long response = projectService.createProject(request, baseURL + "project/" + projectImage, user.getId());
        return ResponseEntity.ok(response);
    }

    // 프로젝트 수정
    @PutMapping
    @ApiOperation(value = "프로젝트 수정")
    public ResponseEntity<?> updateProject(
            @RequestBody ProjectUpdateRequest request) {
        projectService.updateProject(request);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/image/{projectId}")
    @ApiOperation(value = "프로젝트 이미지 수정")
    public ResponseEntity<?> updateProjectImage(
            @LoginUser User user,
            @ApiParam(value = "프로젝트 pk") @PathVariable Long projectId,
            @RequestPart(value = "image") final MultipartFile file) {
        String projectImage = awsS3Service.uploadFile(file, "project/");
        projectService.updateProjectImage(baseURL + "project/" + projectImage, projectId, user.getId());
        return ResponseEntity.ok().build();
    }

    // 프로젝트 삭제
    @DeleteMapping("/{projectId}")
    @ApiOperation(value = "프로젝트 삭제")
    public ResponseEntity<?> deleteProject(
            @PathVariable Long projectId,
            @LoginUser User user,
            @RequestHeader HttpHeaders headers) {
        projectService.deleteProject(projectId, user.getId(), headers.get(HttpHeaders.AUTHORIZATION));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/token")
    @ApiOperation(value = "프로젝트 토큰 등록")
    public ResponseEntity<?> updateProjectToken(
            @LoginUser User user,
            @RequestBody ProjectTokenUpdateRequest request,
            @RequestHeader HttpHeaders headers) {
        projectService.updateProjectToken(user, request, headers.get(HttpHeaders.AUTHORIZATION));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/token")
    @ApiOperation(value = "프로젝트 토큰 연동 해제")
    public ResponseEntity<?> deleteProjectToken(
            @LoginUser User user,
            @RequestParam Long projectId,
            @RequestParam String name) {
        projectService.deleteProjectToken(user, projectId, name);
        return ResponseEntity.ok().build();
    }
}
