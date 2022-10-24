package com.ssafy.service;

import com.ssafy.dto.IssueTemplateCreateRequest;
import com.ssafy.dto.IssueTemplateResponse;

import java.util.List;

public interface IssueTemplateService {
    // 이슈 템플릿 리스트 조회
    List<IssueTemplateResponse> getIssueTemplates(Long userId, Long projectId, Boolean me);
    // 이슈 템플릿 생성
    void createIssueTemplate(Long userId, IssueTemplateCreateRequest issueTemplateCreateRequest);
}
