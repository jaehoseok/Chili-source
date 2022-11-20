package com.ssafy.controller;

import com.ssafy.config.loginuser.LoginUser;
import com.ssafy.config.loginuser.User;
import com.ssafy.dto.request.*;
import com.ssafy.dto.response.IssueListResponse;
import com.ssafy.dto.response.IssueTemplateResponse;
import com.ssafy.dto.response.MiddleBucketResponse;
import com.ssafy.dto.response.jira.epic.JiraEpicListResponse;
import com.ssafy.dto.response.jira.issue.JiraIssueListResponse;
import com.ssafy.dto.response.jira.issue.JiraIssueResponse;
import com.ssafy.dto.response.jira.project.JiraProjectResponse;
import com.ssafy.dto.response.jira.sprint.JiraSprintListResponse;
import com.ssafy.dto.response.jira.sprint.JiraSprintProgressResponse;
import com.ssafy.service.IssueService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RestController
@Api(tags = "이슈템플릿/미들버킷")
public class IssueController {
    private final IssueService issueService;

    // 이슈 템플릿 조회
    @GetMapping
    @ApiOperation(value = "이슈 템플릿 리스트 조회")
    public ResponseEntity<List<IssueTemplateResponse>> getIssueTemplates(
            @LoginUser User user,
            @ApiParam(value = "특정 프로젝트 내의 이슈 템플릿을 조회하고 싶다면, 프로젝트 id")
            @RequestParam(required = false) Long projectId,
            @ApiParam(value = "내 이슈 템플릿만 조회하고 싶다면 true를, 프로젝트 전체 이슈 템플릿을 조회하고 싶다면 false를 부여합니다", example = "true/false")
            @RequestParam Boolean me,
            @RequestHeader HttpHeaders headers
    ) {
        List<IssueTemplateResponse> responses = issueService.getIssueTemplates(
                user.getId(),
                projectId,
                me,
                headers.get(HttpHeaders.AUTHORIZATION));
        return ResponseEntity.ok()
                .body(responses);
    }

    // 이슈 템플릿 등록
    @PostMapping("/")
    @ApiOperation(value = "이슈 템플릿 등록")
    public ResponseEntity<?> createIssueTemplate(
            @LoginUser User user,
            @RequestBody IssueTemplateCreateRequest request,
            @RequestHeader HttpHeaders headers
    ) {
        issueService.createIssueTemplate(
                user.getId(),
                request,
                headers.get(HttpHeaders.AUTHORIZATION));
        return ResponseEntity.ok()
                .build();
    }

    // 이슈 템플릿 수정
    @PutMapping("/{issueTemplateId}")
    @ApiOperation(value = "이슈 템플릿 수정")
    public ResponseEntity<?> updateIssueTemplate(
            @LoginUser User user,
            @ApiParam(value = "수정하고 싶은 이슈 템플릿의 id") @PathVariable Long issueTemplateId,
            @RequestBody IssueTemplateUpdateRequest request
    ) {
        issueService.updateIssueTemplate(
                user.getId(),
                issueTemplateId, request);
        return ResponseEntity.ok()
                .build();
    }

    // 이슈 템플릿 삭제
    @DeleteMapping("/{issueTemplateId}")
    @ApiOperation(value = "이슈 템플릿 삭제")
    public ResponseEntity<?> deleteIssueTemplate(
            @LoginUser User user,
            @ApiParam(value = "삭제하고 싶은 이슈 템플릿의 id") @PathVariable Long issueTemplateId) {
        issueService.deleteIssueTemplate(user.getId(), issueTemplateId);
        return ResponseEntity.ok()
                .build();
    }

    // 미들 버킷 리스트 조회
    @GetMapping("/middle-buckets")
    @ApiOperation(value = "미들 버킷 리스트 조회")
    public ResponseEntity<List<MiddleBucketResponse>> getMiddleBuckets(
            @LoginUser User user,
            @ApiParam(value = "특정 프로젝트 내의 미들버킷을 조회하고 싶다면, 프로젝트 id")
            @RequestParam(required = false) Long projectId,
            @ApiParam(value = "내 미들버킷만 조회하고 싶다면 true를, 프로젝트 전체 이슈 템플릿을 조회하고 싶다면 false를 부여합니다", example = "true/false")
            @RequestParam Boolean me,
            @RequestHeader HttpHeaders headers) {
        List<MiddleBucketResponse> responses = issueService.getMiddleBuckets(
                user.getId(),
                projectId,
                me,
                headers.get(HttpHeaders.AUTHORIZATION));
        return ResponseEntity.ok()
                .body(responses);
    }

    // 미들 버킷 생성
    @PostMapping("/middle-buckets")
    @ApiOperation(value = "미들 버킷 생성")
    public ResponseEntity<?> createMiddleBucket(
            @LoginUser User user,
            @RequestBody MiddleBucketCreateRequest request,
            @RequestHeader HttpHeaders headers
    ) {
        issueService.createMiddleBucket(
                user.getId(),
                request,
                headers.get(HttpHeaders.AUTHORIZATION));
        return ResponseEntity.ok()
                .build();
    }

    // 미들 버킷 수정
    @PutMapping("/middle-buckets/{middleBucketId}")
    @ApiOperation(value = "미들 버킷 수정")
    public ResponseEntity<?> updateMiddleBucket(
            @LoginUser User user,
            @ApiParam(value = "수정하고 싶은 미들 버킷의 id") @PathVariable Long middleBucketId,
            @RequestBody MiddleBucketUpdateRequest request
    ) {
        issueService.updateMiddleBucket(
                user.getId(),
                middleBucketId, request);
        return ResponseEntity.ok()
                .build();
    }

    // 미들 버킷 삭제
    @DeleteMapping("/middle-buckets/{middleBucketId}")
    public ResponseEntity<?> deleteMiddleBucket(
            @LoginUser User user,
            @ApiParam(value = "삭제하고 싶은 미들 버킷의 id") @PathVariable Long middleBucketId
    ) {
        issueService.deleteMiddleBucket(
                user.getId(),
                middleBucketId);
        return ResponseEntity.ok()
                .build();
    }

    // 미들 버킷 조회
    @GetMapping("/middle-buckets/{middleBucketId}")
    @ApiOperation(value = "미들 버킷 내의 이슈 리스트 조회")
    public ResponseEntity<IssueListResponse> getMiddleBucket(
            @LoginUser User user,
            @ApiParam(value = "조회하고 싶은 미들 버킷의 id") @PathVariable Long middleBucketId
    ) {
        IssueListResponse response = issueService.getMiddleBucket(
                user.getId(),
                middleBucketId);
        return ResponseEntity.ok()
                .body(response);
    }

    // 미들 버킷에 이슈 추가
    @PostMapping("/middle-buckets/{middleBucketId}")
    @ApiOperation(value = "미들 버킷에 이슈 추가")
    public ResponseEntity<?> createIssueIntoMiddleBucket(
            @LoginUser User user,
            @ApiParam(value = "이슈를 추가하고 싶은 미들 버킷의 id") @PathVariable Long middleBucketId,
            @RequestBody MiddleBucketIssueCreateRequest request
    ) {
        issueService.createIssueIntoMiddleBucket(
                user.getId(),
                middleBucketId, request);
        return ResponseEntity.ok()
                .build();
    }

    // 미들 버킷 내의 이슈 수정
    @PutMapping("/middle-buckets/{middleBucketId}/{middleBucketIssueId}")
    @ApiOperation(value = "미들 버킷에 이슈 수정")
    public ResponseEntity<?> updateIssueInMiddleBucket(
            @LoginUser User user,
            @ApiParam(value = "수정하고 싶은 이슈가 담긴 미들 버킷의 id") @PathVariable Long middleBucketId,
            @ApiParam(value = "수정하고 싶은 미들 버킷 이슈의 id") @PathVariable Long middleBucketIssueId,
            @RequestBody MiddleBucketIssueUpdateRequest request
    ) {
        issueService.updateIssueInMiddleBucket(
                user.getId(),
                middleBucketId, middleBucketIssueId, request);
        return ResponseEntity.ok()
                .build();
    }

    // 미들 버킷 내의 이슈 삭제
    @DeleteMapping("/middle-buckets/{middleBucketId}/{middleBucketIssueId}")
    @ApiOperation(value = "미들 버킷에 이슈 삭제")
    public ResponseEntity<?> deleteIssueInMiddleBucket(
            @LoginUser User user,
            @ApiParam(value = "수정하고 싶은 이슈가 담긴 미들 버킷의 id") @PathVariable Long middleBucketId,
            @ApiParam(value = "삭제하고 싶은 미들 버킷 이슈의 id") @PathVariable Long middleBucketIssueId
    ) {
        issueService.deleteIssueInMiddleBucket(
                user.getId(),
                middleBucketId, middleBucketIssueId);
        return ResponseEntity.ok()
                .build();
    }

    // =========================================== 내부 API ==================================================
    // 프로젝트 id로 그 이하 모든 이슈템플릿과 미들버킷 삭제
    @DeleteMapping("/all/{projectId}")
    @ApiOperation(value = "프로젝트 삭제시 그 이하 모든 이슈템플릿/미들버킷 삭제")
    public ResponseEntity<?> deleteAll(
            @LoginUser User user,
            @ApiParam(value = "삭제하려는 프로젝트 id") @PathVariable("projectId") Long projectId
    ) {
        issueService.deleteAll(user, projectId);
        return ResponseEntity.ok()
                .build();
    }

    // =========================================== JIRA API ==================================================
    // 프로젝트 목록 조회
    @GetMapping("/jira/project-list")
    @ApiOperation(value = "우리 서비스와 연동할 JIRA 프로젝트 목록 가져오기")
    public ResponseEntity<List<JiraProjectResponse>> getProjectList(
            @LoginUser User user,
            @RequestHeader HttpHeaders headers
    ) {
        List<JiraProjectResponse> responses = issueService.getProjectList(
                user,
                headers.get(HttpHeaders.AUTHORIZATION)
        );
        return ResponseEntity.ok()
                .body(responses);
    }

    // 에픽 리스트 조회
    @GetMapping("/jira/epic-list")
    @ApiOperation(value = "JIRA에서 생성된 EPIC들 가져오기")
    public ResponseEntity<JiraEpicListResponse> getEpicList(
            @LoginUser User user,
            @RequestHeader HttpHeaders headers
    ) {
        JiraEpicListResponse response = issueService.getEpicList(
                user,
                headers.get(HttpHeaders.AUTHORIZATION));
        return ResponseEntity.ok()
                .body(response);
    }

    // 현 프로젝트의 스프린트 목록 가져오기
    @GetMapping("/jira/sprint/{projectId}")
    @ApiOperation(value = "현재 프로젝트의 스프린트 목록 가져오기")
    public ResponseEntity<JiraSprintListResponse> getSprints(
            @LoginUser User user,
            @RequestHeader HttpHeaders headers,
            @ApiParam(value = "JIRA와 연동된 프로젝트 id") @PathVariable Long projectId
    ) {
        JiraSprintListResponse response = issueService.getSprints(
                user,
                headers.get(HttpHeaders.AUTHORIZATION),
                projectId
        );
        return ResponseEntity.ok()
                .body(response);
    }

    // 나의 할 일 + 진행 중 이슈만 조회
    @GetMapping("/jira/issues/todo/{projectId}")
    @ApiOperation(value = "아직 DONE하지 않은 JIRA의 이슈 가져오기")
    public ResponseEntity<JiraIssueListResponse> getTodoIssues(
            @LoginUser User user,
            @RequestHeader HttpHeaders headers,
            @ApiParam(value = "JIRA와 연동된 프로젝트 id") @PathVariable Long projectId
    ) throws Exception {
        JiraIssueListResponse response = issueService.getTodoIssues(
                user,
                headers.get(HttpHeaders.AUTHORIZATION),
                projectId);
        return ResponseEntity.ok()
                .body(response);
    }

    // 지라의 이슈 조회
    @GetMapping("/jira/issues/{issueKey}")
    @ApiOperation(value = "issueKey로 jira의 이슈를 조회")
    public ResponseEntity<JiraIssueResponse> getIssue(
            @LoginUser User user,
            @RequestHeader HttpHeaders headers,
            @ApiParam(value = "JIRA issue key") @PathVariable String issueKey
    ) {
        JiraIssueResponse response = issueService.getIssue(
                user,
                headers.get(HttpHeaders.AUTHORIZATION),
                issueKey
        );
        return ResponseEntity.ok()
                .body(response);
    }

    // 지라의 이슈 수정
    @PutMapping("/jira/issues/{issueKey}")
    @ApiOperation(value = "issueKey 에 해당하는 jira 이슈")
    public ResponseEntity<?> updateIssue(
            @LoginUser User user,
            @RequestHeader HttpHeaders headers,
            @ApiParam(value = "JIRA issue key") @PathVariable String issueKey,
            @RequestBody IssueUpdateRequest request
    ) {
        issueService.updateIssueStatus(user, headers.get(HttpHeaders.AUTHORIZATION), issueKey, request);
        return ResponseEntity.ok()
                .build();
    }

    // 미들버킷 내의 이슈들을 지라의 이슈로 생성
    @PostMapping("/jira/middle-bucket")
    @ApiOperation(value = "미들 버킷에 있는 모든 이슈를 JIRA에 생성")
    public ResponseEntity<?> addIssuesToJira(
            @LoginUser User user,
            @ApiParam(value = "JIRA와 연동된 현 프로젝트 id") @RequestParam Long projectId,
            @ApiParam(value = "JIRA에 추가하려는 이슈가 담긴 미들버킷 id") @RequestParam Long middleBucketId,
            @RequestHeader HttpHeaders headers
    ) throws IOException {
        issueService.addIssuesToJira(
                user,
                projectId,
                middleBucketId,
                headers.get(HttpHeaders.AUTHORIZATION));
        return ResponseEntity.ok()
                .build();
    }

    // 지라 위젯 - 스프린트 목록 및 선택된 스프린트의 달성도 조회
    @GetMapping("/jira/widget")
    public ResponseEntity<JiraSprintProgressResponse> getProgress(
            @LoginUser User user,
            @RequestHeader HttpHeaders headers,
            @ApiParam(value = "JIRA 와 연동된 프로젝트 id") @RequestParam Long projectId,
            @ApiParam(value = "조회하고싶은 스프린트 id") @RequestParam(required = false) Long sprintId
    ) {
        JiraSprintProgressResponse response = issueService.getSprintProgress(user, headers.get(HttpHeaders.AUTHORIZATION), projectId, sprintId);
        return ResponseEntity.ok()
                .body(response);
    }
}
