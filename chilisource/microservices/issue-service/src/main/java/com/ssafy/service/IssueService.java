package com.ssafy.service;

import com.ssafy.dto.*;

import java.util.List;

public interface IssueService {
    // 이슈 템플릿 리스트 조회
    List<IssueTemplateResponse> getIssueTemplates(Long userId, Long projectId, Boolean me);

    // 이슈 템플릿 생성
    void createIssueTemplate(Long userId, IssueTemplateCreateRequest issueTemplateCreateRequest);

    // 이슈 템플릿 수정
    void updateIssueTemplate(Long userId, Long issueTemplateId, IssueTemplateUpdateRequest issueTemplateUpdateRequest);

    // 이슈 템플릿 삭제
    void deleteIssueTemplate(Long issueTemplateId);

    // 미들 버킷 리스트 조회
    List<MiddleBucketResponse> getMiddleBuckets(Long userId, Long projectId, Boolean me);

    // 미들 버킷 상세 조회
    List<MiddleBucketListResponse> getMiddleBucket(Long userId, Long middleBucketId);

    // 미들 버킷 생성
    void createMiddleBucket(Long userId, MiddleBucketCreateRequest middleBucketCreateRequest);

    // 미들 버킷 수정
    void updateMiddleBucket(Long userId, Long middleBucketId, MiddleBucketUpdateRequest middleBucketUpdateRequest);

    // 미들 버킷 삭제
    void deleteMiddleBucket(Long userId, Long middleBucketId);

    // 미들 버킷에 이슈 추가
    void addIssueIntoMiddleBucket(Long userId, Long middleBucketId, MiddleBucketIssueCreateRequest issueCreateRequest);
}
