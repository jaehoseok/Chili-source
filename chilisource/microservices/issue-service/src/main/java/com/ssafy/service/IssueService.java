package com.ssafy.service;

import com.ssafy.config.loginuser.User;
import com.ssafy.dto.request.*;
import com.ssafy.dto.response.IssueListResponse;
import com.ssafy.dto.response.IssueTemplateResponse;
import com.ssafy.dto.response.MiddleBucketResponse;
import com.ssafy.dto.response.jira.epic.JiraEpicListResponse;
import com.ssafy.dto.response.jira.project.JiraProjectResponse;
import com.ssafy.dto.response.jira.sprint.JiraSprintListResponse;
import com.ssafy.dto.response.jira.sprint.JiraSprintProgressResponse;
import com.ssafy.dto.response.jira.todo.JiraTodoIssueListResponse;
import com.ssafy.dto.response.jira.todo.JiraTodoIssueResponse;

import java.io.IOException;
import java.util.List;

public interface IssueService {
    // 이슈 템플릿 리스트 조회
    List<IssueTemplateResponse> getIssueTemplates(Long userId, Long projectId, Boolean me, List<String> auths);

    // 이슈 템플릿 생성
    void createIssueTemplate(Long userId, IssueTemplateCreateRequest request, List<String> auths);

    // 이슈 템플릿 수정
    void updateIssueTemplate(Long userId, Long issueTemplateId, IssueTemplateUpdateRequest request);

    // 이슈 템플릿 삭제
    void deleteIssueTemplate(Long userId, Long issueTemplateId);

    // 미들 버킷 리스트 조회
    List<MiddleBucketResponse> getMiddleBuckets(Long userId, Long projectId, Boolean me, List<String> auths);

    // 미들 버킷 상세 조회
    IssueListResponse getMiddleBucket(Long userId, Long middleBucketId);

    // 미들 버킷 생성
    void createMiddleBucket(Long userId, MiddleBucketCreateRequest request, List<String> auths);

    // 미들 버킷 수정
    void updateMiddleBucket(Long userId, Long middleBucketId, MiddleBucketUpdateRequest request);

    // 미들 버킷 삭제
    void deleteMiddleBucket(Long userId, Long middleBucketId);

    // 미들 버킷에 이슈 추가
    void createIssueIntoMiddleBucket(Long userId, Long middleBucketId, MiddleBucketIssueCreateRequest request);

    // 미들 버킷의 이슈 수정
    void updateIssueInMiddleBucket(Long userId, Long middleBucketId, Long middleBucketIssueId, MiddleBucketIssueUpdateRequest request);

    // 미들 버킷의 이슈 삭제
    void deleteIssueInMiddleBucket(Long userId, Long middleBucketId, Long middleBucketIssueId);

    // 미들 버킷 내의 이슈를 지라로 생성
    void addIssuesToJira(User user, Long projectId, Long middleBucketId, List<String> auths) throws IOException;

    // 프로젝트의 에픽 리스트 조회
    JiraEpicListResponse getEpicList(User user, List<String> auths);

    // project 삭제 -> 그 이하 미들버킷이나 이슈템플릿 모두 삭제
    void deleteAll(User user, Long projectId);

    // 아직 done 하지 않은 이슈들 조회
    JiraTodoIssueListResponse getTodoIssues(User user, List<String> auths, Long projectId) throws Exception;

    // 프로젝트 목록 조회
    List<JiraProjectResponse> getProjectList(User user, List<String> auths);

    // 스프린트 목록 조회
    JiraSprintListResponse getSprints(User user, List<String> auths, Long projectId);

    // jira의 이슈 단일 조회
    JiraTodoIssueResponse getIssue(User user, List<String> auths, String issueKey);

    JiraSprintProgressResponse getSprintProgress(User user, List<String> auths, Long projectId, Long sprintId);
}
