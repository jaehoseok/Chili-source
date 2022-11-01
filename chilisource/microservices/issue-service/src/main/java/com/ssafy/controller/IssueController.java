package com.ssafy.controller;

import com.ssafy.config.loginuser.LoginUser;
import com.ssafy.config.loginuser.User;
import com.ssafy.dto.request.*;
import com.ssafy.dto.response.IssueListResponse;
import com.ssafy.dto.response.IssueTemplateResponse;
import com.ssafy.dto.response.MiddleBucketResponse;
import com.ssafy.service.IssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class IssueController {
    private final IssueService issueService;

    // 이슈 템플릿 조회
    @GetMapping("/")
    public ResponseEntity<?> getIssueTemplates(
            @LoginUser User user,
            @RequestParam(required = false) Long projectId,
            @RequestParam Boolean me
    ) {
        List<IssueTemplateResponse> responses = issueService.getIssueTemplates(
                user.getId(),
//                1L,
                projectId, me);
        return ResponseEntity.ok()
                .body(responses);
    }

    // 이슈 템플릿 등록
    @PostMapping("/")
    public ResponseEntity<?> createIssueTemplate(
            @LoginUser User user,
            @RequestBody IssueTemplateCreateRequest request
    ) {
        issueService.createIssueTemplate(
                user.getId(),
//                1L,
                request);
        return ResponseEntity.ok()
                .build();
    }

    // 이슈 템플릿 수정
    @PutMapping("/{issueTemplateId}")
    public ResponseEntity<?> updateIssueTemplate(
            @LoginUser User user,
            @PathVariable Long issueTemplateId,
            @RequestBody IssueTemplateUpdateRequest request
    ) {
        issueService.updateIssueTemplate(
                user.getId(),
//                1L,
                issueTemplateId, request);
        return ResponseEntity.ok()
                .build();
    }

    // 이슈 템플릿 삭제
    @DeleteMapping("/{issueTemplateId}")
    public ResponseEntity<?> deleteIssueTemplate(
            @LoginUser User user,
            @PathVariable Long issueTemplateId) {
        issueService.deleteIssueTemplate(issueTemplateId);
        return ResponseEntity.ok()
                .build();
    }

    // 미들 버킷 리스트 조회
    @GetMapping("/middle-buckets")
    public ResponseEntity<?> getMiddleBuckets(
            @LoginUser User user,
            @RequestParam(required = false) Long projectId,
            @RequestParam Boolean me) {
        List<MiddleBucketResponse> responses = issueService.getMiddleBuckets(
                user.getId(),
//                1L,
                projectId, me);
        return ResponseEntity.ok()
                .body(responses);
    }

    // 미들 버킷 생성
    @PostMapping("/middle-buckets")
    public ResponseEntity<?> createMiddleBucket(
            @LoginUser User user,
            @RequestBody MiddleBucketCreateRequest request
    ) {
        issueService.createMiddleBucket(
                user.getId(),
//                1L,
                request);
        return ResponseEntity.ok()
                .build();
    }

    // 미들 버킷 수정
    @PutMapping("/middle-buckets/{middleBucketId}")
    public ResponseEntity<?> updateMiddleBucket(
            @LoginUser User user,
            @PathVariable Long middleBucketId,
            @RequestBody MiddleBucketUpdateRequest request
    ) {
        issueService.updateMiddleBucket(
                user.getId(),
//                1L,
                middleBucketId, request);
        return ResponseEntity.ok()
                .build();
    }

    // 미들 버킷 삭제
    @DeleteMapping("/middle-buckets/{middleBucketId}")
    public ResponseEntity<?> deleteMiddleBucket(
            @LoginUser User user,
            @PathVariable Long middleBucketId
    ) {
        issueService.deleteMiddleBucket(
                user.getId(),
//                1L,
                middleBucketId);
        return ResponseEntity.ok()
                .build();
    }

    // 미들 버킷 조회
    @GetMapping("/middle-buckets/{middleBucketId}")
    public ResponseEntity<?> getMiddleBucket(
            @LoginUser User user,
            @PathVariable Long middleBucketId
    ) {
        IssueListResponse response = issueService.getMiddleBucket(
                user.getId(),
//                1L,
                middleBucketId);
        return ResponseEntity.ok()
                .body(response);
    }

    // 미들 버킷에 이슈 추가
    @PostMapping("/middle-buckets/{middleBucketId}")
    public ResponseEntity<?> createIssueIntoMiddleBucket(
            @LoginUser User user,
            @PathVariable Long middleBucketId,
            @RequestBody MiddleBucketIssueCreateRequest request
    ) {
        issueService.createIssueIntoMiddleBucket(
                user.getId(),
//                1L,
                middleBucketId, request);
        return ResponseEntity.ok()
                .build();
    }

    // 미들 버킷 내의 이슈 수정
    @PutMapping("/middle-buckets/{middleBucketId}/{middleBucketIssueId}")
    public ResponseEntity<?> updateIssueInMiddleBucket(
            @LoginUser User user,
            @PathVariable Long middleBucketId,
            @PathVariable Long middleBucketIssueId,
            @RequestBody MiddleBucketIssueUpdateRequest request
    ) {
        issueService.updateIssueInMiddleBucket(
                user.getId(),
//                1L,
                middleBucketId, middleBucketIssueId, request);
        return ResponseEntity.ok()
                .build();
    }

    // 미들 버킷 내의 이슈 삭제
    @DeleteMapping("/middle-buckets/{middleBucketId}/{middleBucketIssueId}")
    public ResponseEntity<?> deleteIssueInMiddleBucket(
            @LoginUser User user,
            @PathVariable Long middleBucketId,
            @PathVariable Long middleBucketIssueId
    ) {
        issueService.deleteIssueInMiddleBucket(
                user.getId(),
//                1L,
                middleBucketId, middleBucketIssueId);
        return ResponseEntity.ok()
                .build();
    }

    // 미들버킷 내의 이슈들을 지라의 이슈로 생성
    @PutMapping("/jira/middle-bucket")
    public ResponseEntity<?> addIssuesToJira(
            @LoginUser User user,
            @RequestParam Long projectId,
            @RequestParam Long middleBucketId
    ) {
        issueService.addIssuesToJira(
                user.getId(),
//                1L,
                projectId,
                middleBucketId);
        return ResponseEntity.ok().build();
    }

    // 에픽 리스트 조회
    @GetMapping("/epic-list")
    public ResponseEntity<?> getEpicList(
            @LoginUser User user
    ) {
        issueService.getEpicList(user);
        return null;
    }

    // 프로젝트 목록을 불러오는 api
}
