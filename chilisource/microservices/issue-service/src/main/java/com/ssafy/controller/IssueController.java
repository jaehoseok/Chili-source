package com.ssafy.controller;

import com.ssafy.config.loginuser.LoginUser;
import com.ssafy.config.loginuser.User;
import com.ssafy.dto.*;
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
    @GetMapping
    public ResponseEntity<?> getIssueTemplates(@LoginUser User user, @RequestParam Long projectId, @RequestParam Boolean me) {
        List<IssueTemplateResponse> responses = issueService.getIssueTemplates(user.getId(), projectId, me);
        return ResponseEntity.ok()
                .body(responses);
    }

    // 이슈 템플릿 등록
    @PostMapping
    public ResponseEntity<?> createIssueTemplate(@LoginUser User user, IssueTemplateCreateRequest issueTemplateCreateRequest) {
        issueService.createIssueTemplate(user.getId(), issueTemplateCreateRequest);
        return ResponseEntity.ok()
                .build();
    }

    // 이슈 템플릿 수정
    @PutMapping("{issueTemplateId}")
    public ResponseEntity<?> updateIssueTemplate(@LoginUser User user, @PathVariable Long issueTemplateId, IssueTemplateUpdateRequest issueTemplateUpdateRequest) {
        issueService.updateIssueTemplate(user.getId(), issueTemplateId, issueTemplateUpdateRequest);
        return ResponseEntity.ok()
                .build();
    }

    // 이슈 템플릿 삭제
    @DeleteMapping("{issueTemplateId}")
    public ResponseEntity<?> deleteIssueTemplate(@LoginUser User user, @PathVariable Long issueTemplateId) {
        issueService.deleteIssueTemplate(issueTemplateId);
        return ResponseEntity.ok()
                .build();
    }

    // 미들 버킷 리스트 조회
    @GetMapping("/middle-buckets")
    public ResponseEntity<?> getMiddleBuckets(@LoginUser User user, @RequestParam Long projectId, @RequestParam Boolean me) {
        List<MiddleBucketResponse> responses = issueService.getMiddleBuckets(user.getId(), projectId, me);
        return ResponseEntity.ok()
                .body(responses);
    }

    // 미들 버킷 조회
    @GetMapping("/middle-buckets/{middleBucketId}")
    public ResponseEntity<?> getMiddleBucket(@LoginUser User user, @PathVariable Long middleBucketId) {
        List<MiddleBucketListResponse> responses = issueService.getMiddleBucket(user.getId(), middleBucketId);
        return ResponseEntity.ok()
                .body(responses);
    }

    // 미들 버킷 생성
    // 미들 버킷 수정
    // 미들 버킷 삭제
    // 미들 버킷에 이슈 추가
    // 미들 버킷 내의 이슈 수정
    // 미들 버킷 내의 이슈 삭제
    // 미들 버킷에 이슈 템플릿 추가

    // 이슈 템플릿을 지라의 이슈로 생성
    // 미들 버킷을 지라의 이슈로 생성
}
