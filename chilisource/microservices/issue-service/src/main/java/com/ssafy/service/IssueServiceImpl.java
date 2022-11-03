package com.ssafy.service;

import com.google.common.base.Charsets;
import com.ssafy.client.AuthServiceClient;
import com.ssafy.client.JiraFeignClient;
import com.ssafy.client.ProjectServiceClient;
import com.ssafy.config.loginuser.User;
import com.ssafy.dto.request.*;
import com.ssafy.dto.request.jira.*;
import com.ssafy.dto.response.*;
import com.ssafy.entity.IssueTemplate;
import com.ssafy.entity.IssueType;
import com.ssafy.entity.MiddleBucket;
import com.ssafy.entity.MiddleBucketIssue;
import com.ssafy.exception.BadRequestException;
import com.ssafy.exception.DuplicateException;
import com.ssafy.exception.NotFoundException;
import com.ssafy.exception.WrongFormException;
import com.ssafy.repository.IssueTemplateRepo;
import com.ssafy.repository.IssueTypeRepo;
import com.ssafy.repository.MiddleBucketIssueRepo;
import com.ssafy.repository.MiddleBucketRepo;
import feign.Response;
import io.micrometer.core.instrument.util.IOUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.exception.DuplicateException.MIDDLE_BUCKET_NAME_DUPLICATED;
import static com.ssafy.exception.NotFoundException.*;
import static com.ssafy.exception.WrongFormException.SUMMARY_NOT_NULL;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class IssueServiceImpl implements IssueService {
    private final IssueTemplateRepo issueTemplateRepo;
    private final IssueTypeRepo issueTypeRepo;
    private final MiddleBucketRepo middleBucketRepo;
    private final MiddleBucketIssueRepo middleBucketIssueRepo;
    private final ProjectServiceClient projectServiceClient;
    private final JiraFeignClient jiraFeignClient;
    private final AuthServiceClient authServiceClient;

    @Override
    public List<IssueTemplateResponse> getIssueTemplates(Long userId, Long projectId, Boolean me, List<String> auths) {
        ProjectResponse response = projectServiceClient.getProject(auths, projectId);
        if (response == null) {
            throw new NotFoundException(PROJECT_NOT_FOUND);
        }

        List<IssueTemplate> responses = new ArrayList<>();
        if (projectId != null && !me) {
            responses = issueTemplateRepo.findByProjectId(projectId);
        } else if (projectId == null && me) {
            responses = issueTemplateRepo.findByUserId(userId);
        } else if (projectId != null && me) {
            responses = issueTemplateRepo.findByProjectIdAndUserId(projectId, userId);
        }

        return responses.stream()
                .map(issueTemplate -> IssueTemplateResponse.builder()
                        .issueTemplateId(issueTemplate.getId())
                        .issueType(issueTemplate.getIssueType().getName())
                        .summary(issueTemplate.getSummary())
                        .description(issueTemplate.getDescription())
                        .assignee(issueTemplate.getAssignee())
                        .priority(issueTemplate.getPriority())
                        .epicLink(issueTemplate.getEpicLink())
                        .sprint(issueTemplate.getSprint())
                        .storyPoints(issueTemplate.getStoryPoints())
                        .build()
                ).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void createIssueTemplate(Long userId, IssueTemplateCreateRequest request, List<String> auths) {
        ProjectResponse response = projectServiceClient.getProject(auths, request.getProjectId());
        if (response == null) {
            throw new NotFoundException(PROJECT_NOT_FOUND);
        }
        if (request.getSummary() == null) {
            throw new WrongFormException(SUMMARY_NOT_NULL);
        }
        IssueType issueType = issueTypeRepo.findByName(request.getIssueType())
                .orElseThrow(() -> new NotFoundException(ISSUE_TYPE_NOT_FOUND));

        IssueTemplate issueTemplate = IssueTemplate.builder()
                .summary(request.getSummary())
                .description(request.getDescription())
                .assignee(request.getAssignee())
                .priority(request.getPriority())
                .epicLink(request.getEpicLink())
                .sprint(request.getSprint())
                .storyPoints(request.getStoryPoints())
                .issueType(issueType)
                .userId(userId)
                .projectId(request.getProjectId())
                .build();
        issueTemplateRepo.save(issueTemplate);
    }

    @Transactional
    @Override
    public void updateIssueTemplate(Long userId, Long issueTemplateId, IssueTemplateUpdateRequest request) {
        IssueTemplate issueTemplate = issueTemplateRepo.findById(issueTemplateId)
                .orElseThrow(() -> new NotFoundException(ISSUE_TEMPLATE_NOT_FOUND));
        IssueType issueType = null;
        if (request.getIssueType() != null) {
            issueType = issueTypeRepo.findByName(request.getIssueType())
                    .orElseThrow(() -> new NotFoundException(ISSUE_TYPE_NOT_FOUND));
        }

        issueTemplate.update(
                request.getSummary(),
                request.getDescription(),
                request.getAssignee(),
                request.getPriority(),
                request.getEpicLink(),
                request.getSprint(),
                request.getStoryPoints(),
                issueType
        );
    }

    @Transactional
    @Override
    public void deleteIssueTemplate(Long issueTemplateId) {
        IssueTemplate issueTemplate = issueTemplateRepo.findById(issueTemplateId)
                .orElseThrow(() -> new NotFoundException(ISSUE_TEMPLATE_NOT_FOUND));
        issueTemplateRepo.delete(issueTemplate);
    }

    @Override
    public List<MiddleBucketResponse> getMiddleBuckets(Long userId, Long projectId, Boolean me, List<String> auths) {
        ProjectResponse response = projectServiceClient.getProject(auths, projectId);
        if (response == null) {
            throw new NotFoundException(PROJECT_NOT_FOUND);
        }

        List<MiddleBucket> responses = new ArrayList<>();
        if (projectId != null && !me) {
            responses = middleBucketRepo.findByProjectId(projectId);
        } else if (projectId == null && me) {
            responses = middleBucketRepo.findByUserId(userId);
        } else if (projectId != null && me) {
            responses = middleBucketRepo.findByProjectIdAndUserId(projectId, userId);
        }

        return responses.stream()
                .map(middleBucket -> MiddleBucketResponse.builder()
                        .middleBucketId(middleBucket.getId())
                        .name(middleBucket.getName())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public IssueListResponse getMiddleBucket(Long userId, Long middleBucketId) {
        MiddleBucket middleBucket = middleBucketRepo.findById(middleBucketId)
                .orElseThrow(() -> new NotFoundException(MIDDLE_BUCKET_NOT_FOUND));

        List<IssueResponse> issueList = middleBucket.getMiddleBucketIssues().stream()
                .map(middleBucketIssue -> IssueResponse.builder()
                        .issueId(middleBucketIssue.getId())
                        .issueType(middleBucketIssue.getIssueType().getName())
                        .summary(middleBucketIssue.getSummary())
                        .description(middleBucketIssue.getDescription())
                        .assignee(middleBucketIssue.getAssignee())
                        .priority(middleBucketIssue.getPriority())
                        .epicLink(middleBucketIssue.getEpicLink())
                        .sprint(middleBucketIssue.getSprint())
                        .storyPoints(middleBucketIssue.getStoryPoints())
                        .build())
                .collect(Collectors.toList());

        return IssueListResponse.builder()
                .middleBucketId(middleBucket.getId())
                .middleBucketName(middleBucket.getName())
                .issueList(issueList)
                .build();
    }

    @Transactional
    @Override
    public void createMiddleBucket(Long userId, MiddleBucketCreateRequest request, List<String> auths) {
        Long projectId = request.getProjectId();
        ProjectResponse response = projectServiceClient.getProject(auths, projectId);
        if (response == null) {
            throw new NotFoundException(PROJECT_NOT_FOUND);
        }

        List<MiddleBucket> list = middleBucketRepo.findByProjectIdAndUserId(projectId, userId);
        if (list.stream().anyMatch(middleBucket -> middleBucket.getName().equals(request.getName()))) {
            throw new DuplicateException(MIDDLE_BUCKET_NAME_DUPLICATED);
        }

        MiddleBucket middleBucket = MiddleBucket.builder()
                .name(request.getName())
                .userId(userId)
                .projectId(projectId)
                .build();

        middleBucketRepo.save(middleBucket);
    }

    @Transactional
    @Override
    public void updateMiddleBucket(Long userId, Long middleBucketId, MiddleBucketUpdateRequest request) {
        MiddleBucket middleBucket = middleBucketRepo.findById(middleBucketId)
                .orElseThrow(() -> new NotFoundException(MIDDLE_BUCKET_NOT_FOUND));
        middleBucket.update(request.getName());
    }

    @Transactional
    @Override
    public void deleteMiddleBucket(Long userId, Long middleBucketId) {
        MiddleBucket middleBucket = middleBucketRepo.findById(middleBucketId)
                .orElseThrow(() -> new NotFoundException(MIDDLE_BUCKET_NOT_FOUND));
        middleBucketRepo.delete(middleBucket);
    }

    @Transactional
    @Override
    public void createIssueIntoMiddleBucket(Long userId, Long middleBucketId, MiddleBucketIssueCreateRequest request) {
        if (request.getSummary() == null) {
            throw new WrongFormException(SUMMARY_NOT_NULL);
        }

        MiddleBucket middleBucket = middleBucketRepo.findById(middleBucketId)
                .orElseThrow(() -> new NotFoundException(MIDDLE_BUCKET_NOT_FOUND));
        IssueType issueType = issueTypeRepo.findByName(request.getIssueType())
                .orElseThrow(() -> new NotFoundException(ISSUE_TYPE_NOT_FOUND));

        MiddleBucketIssue middleBucketIssue = MiddleBucketIssue.builder()
                .summary(request.getSummary())
                .description(request.getDescription())
                .assignee(request.getAssignee())
                .priority(request.getPriority())
                .epicLink(request.getEpicLink())
                .sprint(request.getSprint())
                .storyPoints(request.getStoryPoints())
                .middleBucket(middleBucket)
                .issueType(issueType)
                .build();
        middleBucketIssueRepo.save(middleBucketIssue);
    }

    @Transactional
    @Override
    public void updateIssueInMiddleBucket(Long userId, Long middleBucketId, Long middleBucketIssueId, MiddleBucketIssueUpdateRequest request) {
        MiddleBucket middleBucket = middleBucketRepo.findById(middleBucketId)
                .orElseThrow(() -> new NotFoundException(MIDDLE_BUCKET_NOT_FOUND));
        MiddleBucketIssue middleBucketIssue = middleBucketIssueRepo.findById(middleBucketIssueId)
                .orElseThrow(() -> new NotFoundException(MIDDLE_BUCKET_ISSUE_NOT_FOUND));
        if (!middleBucketIssue.getMiddleBucket().equals(middleBucket)) {
            throw new NotFoundException(ISSUE_NOT_FOUND_IN_MIDDLE_BUCKET);
        }
        IssueType issueType = null;
        if (request.getIssueType() != null) {
            issueType = issueTypeRepo.findByName(request.getIssueType())
                    .orElseThrow(() -> new NotFoundException(ISSUE_TYPE_NOT_FOUND));
        }

        middleBucketIssue.update(
                request.getSummary(),
                request.getDescription(),
                request.getAssignee(),
                request.getPriority(),
                request.getEpicLink(),
                request.getSprint(),
                request.getStoryPoints(),
                issueType
        );
    }

    @Transactional
    @Override
    public void deleteIssueInMiddleBucket(Long userId, Long middleBucketId, Long middleBucketIssueId) {
        MiddleBucket middleBucket = middleBucketRepo.findById(middleBucketId)
                .orElseThrow(() -> new NotFoundException(MIDDLE_BUCKET_NOT_FOUND));
        MiddleBucketIssue middleBucketIssue = middleBucketIssueRepo.findById(middleBucketIssueId)
                .orElseThrow(() -> new NotFoundException(MIDDLE_BUCKET_ISSUE_NOT_FOUND));

        if (!middleBucketIssue.getMiddleBucket().equals(middleBucket)) {
            throw new NotFoundException(ISSUE_NOT_FOUND_IN_MIDDLE_BUCKET);
        }

        middleBucketIssueRepo.delete(middleBucketIssue);
    }

    @Transactional
    @Override
    public void addIssuesToJira(User user, Long projectId, Long middleBucketId, List<String> auths) throws IOException {
        // 사용자 아이디로 1. 사용자 이메일 2. 사용자 토큰 3. 사용자 지라 고유 아이디를 받아온다
        TokenResponse response = authServiceClient.getToken(auths, "jira");

        // 이메일과 토큰으로 Base64 인코딩을 한다
        String token = response.getEmail() + ":" + response.getValue();
//        String token = "ehoi.loveyourself@gmail.com:DAgKZgAJGc8SZGDmwHf993C1"; // 테스트용
        String jiraToken = Base64.getEncoder().encodeToString(token.getBytes());

        String userJiraTestId = "62beec7c268cac6e31c5e160"; // 테스트용
//        String userJiraId = response.getSomething();

        // project-feign 으로 지라 프로젝트 코드를 가져온다.
        String jiraProjectCode = projectServiceClient.getProject(auths, projectId)
                .getJiraProject();
        // 테스트용
//        String jiraProjectCode = "CHIL";
//        String jiraProjectId = "10000";

        // 미들 버킷을 가져온다
        MiddleBucket middleBucket = middleBucketRepo.findById(middleBucketId)
                .orElseThrow(() -> new NotFoundException(MIDDLE_BUCKET_NOT_FOUND));

        List<JiraIssueCreateRequest> issueUpdates = new ArrayList<>();
        // 미들 버킷 안에 있는 이슈들을 펼친다
        for (MiddleBucketIssue issue : middleBucket.getMiddleBucketIssues()) {
            // summary
            String summary = issue.getSummary();

            // project : jira project code
            JiraIssueProjectCreateRequest project = JiraIssueProjectCreateRequest.builder()
                    .key(jiraProjectCode)
//                    .id(jiraProjectId)
                    .build();

            // 이슈 타입 : 에픽은 지라에서 직접 생성하고 여기서는 스토리, 태스크, 버그만 생성 가능
            String issueType;
            switch (issue.getIssueType().getName().toUpperCase()) {
                case "STORY": {
                    issueType = "10001";
                    break;
                }
                case "TASK": {
                    issueType = "10002";
                    break;
                }
                case "BUG": {
                    issueType = "10004";
                    break;
                }
                case "SUBTASK": {
                    issueType = "10003";
                    break;
                }
                default: {
                    throw new IllegalArgumentException("알 수 없는 이슈 타입입니다.");
                }
            }
            JiraIssueTypeCreateRequest type = JiraIssueTypeCreateRequest.builder()
                    .id(issueType)
                    .build();

            // parent : 에픽링크
            JiraIssueParentCreateRequest parent = JiraIssueParentCreateRequest.builder()
                    .key(issue.getEpicLink())
                    .build();

            // description
            List<JiraIssueDescriptionContentContentCreateRequest> list = new ArrayList<>();
            JiraIssueDescriptionContentContentCreateRequest contentContentCreateRequest = JiraIssueDescriptionContentContentCreateRequest.builder()
                    .text(issue.getDescription())
                    .build();
            list.add(contentContentCreateRequest);

            List<JiraIssueDescriptionContentCreateRequest> list2 = new ArrayList<>();
            JiraIssueDescriptionContentCreateRequest contentCreateRequest = JiraIssueDescriptionContentCreateRequest.builder()
                    .content(list)
                    .build();
            list2.add(contentCreateRequest);

            JiraIssueDescriptionCreateRequest description = JiraIssueDescriptionCreateRequest.builder()
                    .content(list2)
                    .build();

            // report 와 assignee
            JiraIssueReporterCreateRequest reporter = JiraIssueReporterCreateRequest.builder()
                    .id(userJiraTestId)
                    .build();

            JiraIssueAssigneeCreateRequest assignee = JiraIssueAssigneeCreateRequest.builder()
                    .id(userJiraTestId)
                    .build();

            JiraIssuePriorityCreateRequest priority = JiraIssuePriorityCreateRequest.builder()
                    .name(issue.getPriority())
                    .build();

            JiraIssueDetailCreateRequest fields = JiraIssueDetailCreateRequest.builder()
                    .summary(summary)
                    .issuetype(type)
                    .parent(parent)
                    .description(description)
                    .reporter(reporter)
                    .assignee(assignee)
                    .priority(priority)
                    .project(project)
                    .build();

            JiraIssueCreateRequest build = JiraIssueCreateRequest.builder()
                    .fields(fields)
                    .build();

            issueUpdates.add(build);
        }
        JiraIssueBulkCreateRequest bulk = JiraIssueBulkCreateRequest.builder()
                .issueUpdates(issueUpdates)
                .build();

        /*
        리퀘스트dto -> string 형식으로 출력
        ObjectMapper om = new ObjectMapper();
        String requestJson = om.writeValueAsString(bulk);

        System.out.println("===============");
        System.out.println(requestJson);
        System.out.println("===============");
        */

        // 그걸 다시 list 형식으로 dto를 만든다 그걸 지라에 보낸다
        Response response1 = jiraFeignClient.addIssuesToJira("Basic " + jiraToken, bulk);
        if (HttpStatus.Series.valueOf(response1.status()) != HttpStatus.Series.SUCCESSFUL) {
            String errorDetail;
            try {
                errorDetail = IOUtils.toString(response1.body().asInputStream(), Charsets.UTF_8);
            } catch (IOException e) {
                errorDetail = "IO Exception 발생";
            }
            throw new BadRequestException(errorDetail);
        }
    }

    @Override
    public JiraEpicListResponse getEpicList(
            User user,
            List<String> auths
    ) {
        // 사용자 아이디로 1. 사용자 이메일 2. 사용자 토큰 3. 사용자 지라 고유 아이디를 받아온다
        TokenResponse response = authServiceClient.getToken(auths, "jira");

        // 이메일과 토큰으로 Base64 인코딩을 한다
        String token = response.getEmail() + ":" + response.getValue();

//        String token = "ehoi.loveyourself@gmail.com:DAgKZgAJGc8SZGDmwHf993C1"; // TODO 테스트용

        String jiraToken = Base64.getEncoder().encodeToString(token.getBytes());

        // feign을 요청해서 -> dto 로 받는다
        JiraEpicListResponse jiraEpics = jiraFeignClient.getJiraEpics("Basic " + jiraToken);

        // 리턴한다
        return jiraEpics;
    }

    @Transactional
    @Override
    public void deleteAll(User user, Long projectId) {
        issueTemplateRepo.deleteAllInBatch(issueTemplateRepo.findByProjectId(projectId));
        List<MiddleBucket> middleBuckets = middleBucketRepo.findByProjectId(projectId);
        for (MiddleBucket middleBucket : middleBuckets) {
            List<MiddleBucketIssue> middleBucketIssues = middleBucket.getMiddleBucketIssues();
            middleBucketIssueRepo.deleteAllInBatch(middleBucketIssues);
        }
        middleBucketRepo.deleteAllInBatch(middleBuckets);
    }
}
