package com.ssafy.controller;

import com.ssafy.config.loginuser.LoginUser;
import com.ssafy.config.loginuser.User;
import com.ssafy.dto.IssueTemplateCreateRequest;
import com.ssafy.dto.IssueTemplateResponse;
import com.ssafy.service.IssueTemplateServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
public class IssueTemplateController {
    private final IssueTemplateServiceImpl issueTemplateService;

    // 이슈 템플릿 조회
    @GetMapping()
    public ResponseEntity<?> getIssueTemplates(@LoginUser User user, @RequestParam Long projectId, @RequestParam Boolean me) {
        log.info("이슈 템플릿 조회 API 호출");
        List<IssueTemplateResponse> responses = issueTemplateService.getIssueTemplates(user.getId(), projectId, me);
        log.info("이슈 템플릿 조회 API 성공");
        return ResponseEntity.status(HttpStatus.OK)
                .body(responses);
    }

    // 이슈 템플릿 등록
    @PostMapping()
    public ResponseEntity<?> createIssueTemplate(@LoginUser User user, IssueTemplateCreateRequest issueTemplateCreateRequest) {
        log.info("이슈 템플릿 생성 API 호출");
        issueTemplateService.createIssueTemplate(user.getId(), issueTemplateCreateRequest);
        log.info("이슈 템플릿 생성 API 성공");
        return ResponseEntity.status(HttpStatus.OK)
                .build();
    }
    // 이슈 템플릿 수정
    // 이슈 템플릿 삭제
    // 미들 버킷 리스트 조회
    // 미들 버킷 조회
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
