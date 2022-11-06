package com.ssafy.service;

import com.google.common.base.Charsets;
import com.ssafy.client.AuthServiceClient;
import com.ssafy.client.JiraFeignClient;
import com.ssafy.client.ProjectServiceClient;
import com.ssafy.config.loginuser.User;
import com.ssafy.dto.request.*;
import com.ssafy.dto.request.jira.*;
import com.ssafy.dto.response.*;
import com.ssafy.dto.response.jira.epic.JiraEpicListResponse;
import com.ssafy.dto.response.jira.project.JiraProjectResponse;
import com.ssafy.dto.response.jira.todo.JiraTodoIssueListResponse;
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
import org.springframework.util.Base64Utils;

import java.io.IOException;
import java.util.ArrayList;
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
            log.error("[Issue] [getIssueTemplates] PROJECT_NOT_FOUND");
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
//                        .sprint(issueTemplate.getSprint())
                                .storyPoints(issueTemplate.getStoryPoints())
                                .build()
                ).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void createIssueTemplate(Long userId, IssueTemplateCreateRequest request, List<String> auths) {
        ProjectResponse response = projectServiceClient.getProject(auths, request.getProjectId());
        if (response == null) {
            log.error("[Issue] [createIssueTemplate] PROJECT_NOT_FOUND");
            throw new NotFoundException(PROJECT_NOT_FOUND);
        }
        if (request.getSummary() == null) {
            log.error("[Issue] [createIssueTemplate] SUMMARY_NOT_NULL");
            throw new WrongFormException(SUMMARY_NOT_NULL);
        }
        IssueType issueType = issueTypeRepo.findByName(request.getIssueType())
                .orElseThrow(() -> {
                    log.error("[Issue] [createIssueTemplate] ISSUE_TYPE_NOT_FOUND");
                    return new NotFoundException(ISSUE_TYPE_NOT_FOUND);
                });

        IssueTemplate issueTemplate = IssueTemplate.builder()
                .summary(request.getSummary())
                .description(request.getDescription())
                .assignee(request.getAssignee())
                .priority(request.getPriority())
                .epicLink(request.getEpicLink())
//                .sprint(request.getSprint())
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
                .orElseThrow(() -> {
                    log.error("[Issue] [updateIssueTemplate] ISSUE_TEMPLATE_NOT_FOUND");
                    return new NotFoundException(ISSUE_TEMPLATE_NOT_FOUND);
                });
        IssueType issueType = null;
        if (request.getIssueType() != null) {
            issueType = issueTypeRepo.findByName(request.getIssueType())
                    .orElseThrow(() -> {
                        log.error("[Issue] [updateIssueTemplate] ISSUE_TYPE_NOT_FOUND");
                        return new NotFoundException(ISSUE_TYPE_NOT_FOUND);
                    });
        }

        issueTemplate.update(
                request.getSummary(),
                request.getDescription(),
                request.getAssignee(),
                request.getPriority(),
                request.getEpicLink(),
//                request.getSprint(),
                request.getStoryPoints(),
                issueType
        );
    }

    @Transactional
    @Override
    public void deleteIssueTemplate(Long issueTemplateId) {
        IssueTemplate issueTemplate = issueTemplateRepo.findById(issueTemplateId)
                .orElseThrow(() -> {
                    log.error("[Issue] [deleteIssueTemplate] ISSUE_TEMPLATE_NOT_FOUND");
                    return new NotFoundException(ISSUE_TEMPLATE_NOT_FOUND);
                });
        issueTemplateRepo.delete(issueTemplate);
    }

    @Override
    public List<MiddleBucketResponse> getMiddleBuckets(Long userId, Long projectId, Boolean me, List<String> auths) {
        ProjectResponse response = projectServiceClient.getProject(auths, projectId);
        if (response == null) {
            log.error("[Issue] [getMiddleBuckets] PROJECT_NOT_FOUND");
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

    @Transactional
    @Override
    public void createMiddleBucket(Long userId, MiddleBucketCreateRequest request, List<String> auths) {
        Long projectId = request.getProjectId();
        ProjectResponse response = projectServiceClient.getProject(auths, projectId);
        if (response == null) {
            log.error("[Issue] [createMiddleBucket] PROJECT_NOT_FOUND");
            throw new NotFoundException(PROJECT_NOT_FOUND);
        }

        List<MiddleBucket> list = middleBucketRepo.findByProjectIdAndUserId(projectId, userId);
        if (list.stream().anyMatch(middleBucket -> middleBucket.getName().equals(request.getName()))) {
            log.error("[Issue] [createMiddleBucket] MIDDLE_BUCKET_NAME_DUPLICATED");
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
                .orElseThrow(() -> {
                    log.error("[Issue] [updateMiddleBucket] MIDDLE_BUCKET_NOT_FOUND");
                    return new NotFoundException(MIDDLE_BUCKET_NOT_FOUND);
                });
        middleBucket.update(request.getName());
    }

    @Transactional
    @Override
    public void deleteMiddleBucket(Long userId, Long middleBucketId) {
        MiddleBucket middleBucket = middleBucketRepo.findById(middleBucketId)
                .orElseThrow(() -> {
                    log.error("[Issue] [deleteMiddleBucket] MIDDLE_BUCKET_NOT_FOUND");
                    return new NotFoundException(MIDDLE_BUCKET_NOT_FOUND);
                });
        middleBucketRepo.delete(middleBucket);
    }

    @Override
    public IssueListResponse getMiddleBucket(Long userId, Long middleBucketId) {
        MiddleBucket middleBucket = middleBucketRepo.findById(middleBucketId)
                .orElseThrow(() -> {
                    log.error("[Issue] [getMiddleBucket] MIDDLE_BUCKET_NOT_FOUND");
                    return new NotFoundException(MIDDLE_BUCKET_NOT_FOUND);
                });

        List<IssueResponse> issueList = middleBucket.getMiddleBucketIssues().stream()
                .map(middleBucketIssue -> IssueResponse.builder()
                        .issueId(middleBucketIssue.getId())
                        .issueType(middleBucketIssue.getIssueType().getName())
                        .summary(middleBucketIssue.getSummary())
                        .description(middleBucketIssue.getDescription())
                        .assignee(middleBucketIssue.getAssignee())
                        .priority(middleBucketIssue.getPriority())
                        .epicLink(middleBucketIssue.getEpicLink())
//                        .sprint(middleBucketIssue.getSprint())
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
    public void createIssueIntoMiddleBucket(Long userId, Long middleBucketId, MiddleBucketIssueCreateRequest request) {
        if (request.getSummary() == null) {
            log.error("[Issue] [createIssueIntoMiddleBucket] SUMMARY_NOT_NULL");
            throw new WrongFormException(SUMMARY_NOT_NULL);
        }

        MiddleBucket middleBucket = middleBucketRepo.findById(middleBucketId)
                .orElseThrow(() -> {
                    log.error("[Issue] [createIssueIntoMiddleBucket] MIDDLE_BUCKET_NOT_FOUND");
                    return new NotFoundException(MIDDLE_BUCKET_NOT_FOUND);
                });
        IssueType issueType = issueTypeRepo.findByName(request.getIssueType())
                .orElseThrow(() -> {
                    log.error("[Issue] [createIssueIntoMiddleBucket] ISSUE_TYPE_NOT_FOUND");
                    return new NotFoundException(ISSUE_TYPE_NOT_FOUND);
                });

        MiddleBucketIssue middleBucketIssue = MiddleBucketIssue.builder()
                .summary(request.getSummary())
                .description(request.getDescription())
                .assignee(request.getAssignee())
                .priority(request.getPriority())
                .epicLink(request.getEpicLink())
//                .sprint(request.getSprint())
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
                .orElseThrow(() -> {
                    log.error("[Issue] [updateIssueInMiddleBucket] MIDDLE_BUCKET_NOT_FOUND");
                    return new NotFoundException(MIDDLE_BUCKET_NOT_FOUND);
                });
        MiddleBucketIssue middleBucketIssue = middleBucketIssueRepo.findById(middleBucketIssueId)
                .orElseThrow(() -> {
                    log.error("[Issue] [updateIssueInMiddleBucket] MIDDLE_BUCKET_ISSUE_NOT_FOUND");
                    return new NotFoundException(MIDDLE_BUCKET_ISSUE_NOT_FOUND);
                });
        if (!middleBucketIssue.getMiddleBucket().equals(middleBucket)) {
            log.error("[Issue] [updateIssueInMiddleBucket] ISSUE_NOT_FOUND_IN_MIDDLE_BUCKET");
            throw new NotFoundException(ISSUE_NOT_FOUND_IN_MIDDLE_BUCKET);
        }
        IssueType issueType = null;
        if (request.getIssueType() != null) {
            issueType = issueTypeRepo.findByName(request.getIssueType())
                    .orElseThrow(() -> {
                        log.error("[Issue] [updateIssueInMiddleBucket] ISSUE_TYPE_NOT_FOUND");
                        return new NotFoundException(ISSUE_TYPE_NOT_FOUND);
                    });
        }

        middleBucketIssue.update(
                request.getSummary(),
                request.getDescription(),
                request.getAssignee(),
                request.getPriority(),
                request.getEpicLink(),
//                request.getSprint(),
                request.getStoryPoints(),
                issueType
        );
    }

    @Transactional
    @Override
    public void deleteIssueInMiddleBucket(Long userId, Long middleBucketId, Long middleBucketIssueId) {
        MiddleBucket middleBucket = middleBucketRepo.findById(middleBucketId)
                .orElseThrow(() -> {
                    log.error("[Issue] [deleteIssueInMiddleBucket] MIDDLE_BUCKET_NOT_FOUND");
                    return new NotFoundException(MIDDLE_BUCKET_NOT_FOUND);
                });
        MiddleBucketIssue middleBucketIssue = middleBucketIssueRepo.findById(middleBucketIssueId)
                .orElseThrow(() -> {
                    log.error("[Issue] [deleteIssueInMiddleBucket] MIDDLE_BUCKET_ISSUE_NOT_FOUND");
                    return new NotFoundException(MIDDLE_BUCKET_ISSUE_NOT_FOUND);
                });

        if (!middleBucketIssue.getMiddleBucket().equals(middleBucket)) {
            log.error("[Issue] [deleteIssueInMiddleBucket] ISSUE_NOT_FOUND_IN_MIDDLE_BUCKET");
            throw new NotFoundException(ISSUE_NOT_FOUND_IN_MIDDLE_BUCKET);
        }

        middleBucketIssueRepo.delete(middleBucketIssue);
    }

    @Transactional
    @Override
    public void addIssuesToJira(User user, Long projectId, Long middleBucketId, List<String> auths) throws IOException {
        TokenResponse jira = authServiceClient.getToken(auths, "jira");
        String jiraBase64 = "Basic " + Base64Utils.encodeToString((jira.getEmail() + ":" + jira.getValue()).getBytes());
        String userJiraId = jira.getJiraAccountId();
        String jiraProjectCode = projectServiceClient.getProject(auths, projectId)
                .getJiraProject();

        // TODO 테스트용
//        String jiraBase64 = "Basic " + Base64Utils.encodeToString("ehoi.loveyourself@gmail.com:DAgKZgAJGc8SZGDmwHf993C1".getBytes());
//        String userJiraId = "62beec7c268cac6e31c5e160";
//        String jiraProjectCode = "CHIL";
//        String jiraProjectId = "10000";

        MiddleBucket middleBucket = middleBucketRepo.findById(middleBucketId)
                .orElseThrow(() -> {
                    log.error("[Issue] [addIssuesToJira] MIDDLE_BUCKET_NOT_FOUND");
                    return new NotFoundException(MIDDLE_BUCKET_NOT_FOUND);
                });

        List<JiraIssueCreateRequest> issueUpdates = new ArrayList<>();
        for (MiddleBucketIssue issue : middleBucket.getMiddleBucketIssues()) {
            String summary = issue.getSummary();

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
                    log.error("[Issue] [addIssuesToJira] ISSUE_TYPE_NOT_FOUND");
                    throw new NotFoundException(ISSUE_TYPE_NOT_FOUND);
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

            JiraIssueReporterCreateRequest reporter = JiraIssueReporterCreateRequest.builder()
                    .id(userJiraId)
                    .build();

            JiraIssueAssigneeCreateRequest assignee = JiraIssueAssigneeCreateRequest.builder()
                    .id(userJiraId)
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
        Response response1 = jiraFeignClient.addIssuesToJira(jiraBase64, bulk);
        if (HttpStatus.Series.valueOf(response1.status()) != HttpStatus.Series.SUCCESSFUL) {
            String errorDetail;
            try {
                errorDetail = IOUtils.toString(response1.body().asInputStream(), Charsets.UTF_8);
            } catch (IOException e) {
                errorDetail = "IO Exception 발생";
            }
            log.error("[Issue] [addIssuesToJira] {}", errorDetail);
            throw new BadRequestException(errorDetail);
        }
    }

    @Override
    public JiraEpicListResponse getEpicList(
            User user,
            List<String> auths
    ) {
        TokenResponse jira = authServiceClient.getToken(auths, "jira");

        String jiraBase64 = "Basic " + Base64Utils.encodeToString((jira.getEmail() + ":" + jira.getValue()).getBytes());
        // TODO 테스트용
//        String jiraBase64 = "Basic" + Base64Utils.encodeToString("ehoi.loveyourself@gmail.com:DAgKZgAJGc8SZGDmwHf993C1".getBytes());

        return jiraFeignClient.getJiraEpics(jiraBase64);
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

    @Override
    public JiraTodoIssueListResponse getTodoIssues(User user, List<String> auths, Long projectId) throws Exception {
        ProjectResponse response = projectServiceClient.getProject(auths, projectId);
        if (response == null) {
            log.error("[Issue] [getTodoIssues] PROJECT_NOT_FOUND");
            throw new NotFoundException(PROJECT_NOT_FOUND);
        }
        String projectKey = response.getJiraProject();

        TokenResponse jira = authServiceClient.getToken(auths, "jira");
        String jiraBase64 = "Basic " + Base64Utils.encodeToString((jira.getEmail() + ":" + jira.getValue()).getBytes());

        // TODO 테스트용
//        String projectKey = "S07P31B207";
//        String jiraBase64 = "Basic " + Base64Utils.encodeToString("ehoi.loveyourself@gmail.com:DAgKZgAJGc8SZGDmwHf993C1".getBytes());

        String query = "project = " + projectKey + " AND assignee = currentUser() AND status IN (\"To Do\", \"In Progress\") ORDER BY created DESC";

        return jiraFeignClient.getTodoIssues(jiraBase64, query);
    }

    @Override
    public List<JiraProjectResponse> getProjectList(User user, List<String> auths) {
        TokenResponse jira = authServiceClient.getToken(auths, "jira");
        String jiraBase64 = "Basic " + Base64Utils.encodeToString((jira.getEmail() + ":" + jira.getValue()).getBytes());

        // TODO 테스트용
//        String jiraBase64 = "Basic " + Base64Utils.encodeToString("ehoi.loveyourself@gmail.com:DAgKZgAJGc8SZGDmwHf993C1".getBytes());

        return jiraFeignClient.getProjectList(jiraBase64);
    }
}
