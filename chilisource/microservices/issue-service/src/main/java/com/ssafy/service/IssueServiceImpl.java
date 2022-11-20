package com.ssafy.service;

import com.google.common.base.Charsets;
import com.ssafy.client.AuthServiceClient;
import com.ssafy.client.JiraFeignClient;
import com.ssafy.client.ProjectServiceClient;
import com.ssafy.config.loginuser.User;
import com.ssafy.dto.request.*;
import com.ssafy.dto.request.jira.bulk.*;
import com.ssafy.dto.response.*;
import com.ssafy.dto.response.jira.epic.JiraEpicListResponse;
import com.ssafy.dto.response.jira.project.JiraProjectResponse;
import com.ssafy.dto.response.jira.sprint.JiraProjectBoardListResponse;
import com.ssafy.dto.response.jira.sprint.JiraSprintListResponse;
import com.ssafy.dto.response.jira.sprint.JiraSprintProgressResponse;
import com.ssafy.dto.response.jira.sprint.JiraSprintResponse;
import com.ssafy.dto.response.jira.issue.JiraSearchIssueListResponse;
import com.ssafy.dto.response.jira.issue.JiraIssueListResponse;
import com.ssafy.dto.response.jira.issue.JiraIssueResponse;
import com.ssafy.entity.IssueTemplate;
import com.ssafy.entity.IssueType;
import com.ssafy.entity.MiddleBucket;
import com.ssafy.entity.MiddleBucketIssue;
import com.ssafy.exception.*;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.ssafy.exception.DuplicateException.MIDDLE_BUCKET_NAME_DUPLICATED;
import static com.ssafy.exception.NotFoundException.*;
import static com.ssafy.exception.WrongAccessException.*;
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
        if (!issueTemplate.getCreatedUser().equals(userId)) {
            throw new WrongAccessException(CAN_NOT_UPDATE_ISSUE_TEMPLATE);
        }
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
    public void deleteIssueTemplate(Long userId, Long issueTemplateId) {
        IssueTemplate issueTemplate = issueTemplateRepo.findById(issueTemplateId)
                .orElseThrow(() -> new NotFoundException(ISSUE_TEMPLATE_NOT_FOUND));
        if (!issueTemplate.getCreatedUser().equals(userId)) {
            throw new WrongAccessException(CAN_NOT_DELETE_ISSUE_TEMPLATE);
        }
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
        if (!middleBucket.getCreatedUser().equals(userId)) {
            throw new WrongAccessException(CAN_NOT_UPDATE_MIDDLE_BUCKET);
        }
        middleBucket.update(request.getName());
    }

    @Transactional
    @Override
    public void deleteMiddleBucket(Long userId, Long middleBucketId) {
        MiddleBucket middleBucket = middleBucketRepo.findById(middleBucketId)
                .orElseThrow(() -> new NotFoundException(MIDDLE_BUCKET_NOT_FOUND));
        if (!middleBucket.getCreatedUser().equals(userId)) {
            throw new WrongAccessException(CAN_NOT_DELETE_MIDDLE_BUCKET);
        }
        middleBucketRepo.delete(middleBucket);
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
        if (!middleBucketIssue.getCreatedUser().equals(userId)) {
            throw new WrongAccessException(CAN_NOT_UPDATE_MIDDLE_BUCKET_ISSUE);
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
        if (!middleBucketIssue.getCreatedUser().equals(userId)) {
            throw new WrongAccessException(CAN_NOT_DELETE_MIDDLE_BUCKET_ISSUE);
        }
        if (!middleBucketIssue.getMiddleBucket().equals(middleBucket)) {
            throw new NotFoundException(ISSUE_NOT_FOUND_IN_MIDDLE_BUCKET);
        }

        middleBucketIssueRepo.delete(middleBucketIssue);
    }

    // =========================================== 내부 API ==================================================
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

    // =========================================== JIRA API ==================================================
    @Override
    public List<JiraProjectResponse> getProjectList(User user, List<String> auths) {
        TokenResponse jira = authServiceClient.getToken(auths, "jira");
        String jiraBase64 = "Basic " + Base64Utils.encodeToString((jira.getEmail() + ":" + jira.getValue()).getBytes());

        return jiraFeignClient.getProjectList(jiraBase64);
    }

    @Override
    public JiraEpicListResponse getEpicList(User user, List<String> auths) {
        TokenResponse jira = authServiceClient.getToken(auths, "jira");

        String jiraBase64 = "Basic " + Base64Utils.encodeToString((jira.getEmail() + ":" + jira.getValue()).getBytes());

        return jiraFeignClient.getJiraEpics(jiraBase64);
    }


    @Override
    public JiraSprintListResponse getSprints(User user, List<String> auths, Long projectId) {
        ProjectResponse response = projectServiceClient.getProject(auths, projectId);
        if (response == null) {
            throw new NotFoundException(PROJECT_NOT_FOUND);
        }

        TokenResponse jira = authServiceClient.getToken(auths, "jira");
        String jiraBase64 = "Basic " + Base64Utils.encodeToString((jira.getEmail() + ":" + jira.getValue()).getBytes());

        JiraProjectBoardListResponse projectBoardList = jiraFeignClient.getProjectBoard(jiraBase64);
        Long boardId = projectBoardList.getValues().get(0).getId();

        JiraSprintListResponse sprints = jiraFeignClient.getSprints(jiraBase64, boardId);

        return sprints;
    }

    @Override
    public JiraIssueListResponse getTodoIssues(User user, List<String> auths, Long projectId) throws Exception {
        ProjectResponse response = projectServiceClient.getProject(auths, projectId);
        if (response == null) {
            throw new NotFoundException(PROJECT_NOT_FOUND);
        }
        String projectKey = response.getJiraProject();

        TokenResponse jira = authServiceClient.getToken(auths, "jira");
        String jiraBase64 = "Basic " + Base64Utils.encodeToString((jira.getEmail() + ":" + jira.getValue()).getBytes());

        String query = "project = " + projectKey + " AND assignee = currentUser() AND status IN (\"To Do\", \"In Progress\") ORDER BY created DESC";

        return jiraFeignClient.getTodoIssues(jiraBase64, query);
    }

    @Override
    public JiraIssueResponse getIssue(User user, List<String> auths, String issueKey) {
        TokenResponse jira = authServiceClient.getToken(auths, "jira");
        String jiraBase64 = "Basic " + Base64Utils.encodeToString((jira.getEmail() + ":" + jira.getValue()).getBytes());

        return jiraFeignClient.getIssue(jiraBase64, issueKey);
    }

    @Transactional
    @Override
    public void updateIssueStatus(User user, List<String> auths, String issueKey, IssueUpdateRequest request) {
        TokenResponse jira = authServiceClient.getToken(auths, "jira");
        String jiraBase64 = "Basic " + Base64Utils.encodeToString((jira.getEmail() + ":" + jira.getValue()).getBytes());

        if (request.getStatusId() != null) {
            Map<String, Object> statusUpdateRequest = new HashMap<>();
            Map<String, Object> transition = new HashMap<>();
            transition.put("id", request.getStatusId());
            statusUpdateRequest.put("transition", transition);

            jiraFeignClient.updateIssueStatus(jiraBase64, issueKey, statusUpdateRequest);
        }

        Map<String, Object> updateRequest = new HashMap<>();
        Map<String, Object> fields = new HashMap<>();
        boolean summaryChanged = false;
        if (request.getSummary() != null) {
            fields.put("summary", request.getSummary());
            summaryChanged = true;
        }
        if (request.getStoryPoints() != null) fields.put("customfield_10031", request.getStoryPoints());
        updateRequest.put("fields", fields);

        jiraFeignClient.updateIssue(jiraBase64, issueKey, updateRequest);
        if (summaryChanged) {
            projectServiceClient.updateAllGanttChart(
                    AllGanttChartUpdateRequest.builder()
                            .issueCode(issueKey)
                            .summary(request.getSummary())
                            .build());
        }
    }

    @Transactional
    @Override
    public void addIssuesToJira(User user, Long projectId, Long middleBucketId, List<String> auths) throws IOException {
        TokenResponse jira = authServiceClient.getToken(auths, "jira");
        String jiraBase64 = "Basic " + Base64Utils.encodeToString((jira.getEmail() + ":" + jira.getValue()).getBytes());
        String userJiraId = jira.getJiraAccountId();
        String jiraProjectCode = projectServiceClient.getProject(auths, projectId)
                .getJiraProject();

        MiddleBucket middleBucket = middleBucketRepo.findById(middleBucketId)
                .orElseThrow(() -> new NotFoundException(MIDDLE_BUCKET_NOT_FOUND));

        List<JiraIssueCreateRequest> issueUpdates = new ArrayList<>();
        for (MiddleBucketIssue issue : middleBucket.getMiddleBucketIssues()) {
            String summary = issue.getSummary();

            JiraIssueProjectCreateRequest project = JiraIssueProjectCreateRequest.builder()
                    .key(jiraProjectCode)
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
            String text = issue.getDescription();
            if (text == null) {
                text = "";
            }
            List<JiraIssueDescriptionContentContentCreateRequest> list = new ArrayList<>();
            JiraIssueDescriptionContentContentCreateRequest contentContentCreateRequest = JiraIssueDescriptionContentContentCreateRequest.builder()
                    .text(text)
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
                    .customfield_10031(issue.getStoryPoints()) // 스토리포인트
                    .customfield_10020(issue.getSprint()) // 스프린트
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
        // request DTO를 string 형식으로 출력해서 확인해보기
        ObjectMapper om = new ObjectMapper();
        String requestJson = om.writeValueAsString(bulk);

        System.out.println("===============");
        System.out.println(requestJson);
        System.out.println("===============");
        */

        // jira의 Bulk Create Issue API 요청한 후 response 확인
        Response response1 = jiraFeignClient.addIssuesToJira(jiraBase64, bulk);
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
    public JiraSprintProgressResponse getSprintProgress(User user, List<String> auths, Long projectId, Long sprintId) {
        JiraSprintListResponse sprints = getSprints(user, auths, projectId);

        List<JiraSprintResponse> sprintList = sprints.getValues();

        if (sprintList.size() == 0) throw new NotFoundException(SPRINT_NOT_FOUND);

        if (sprintId == null) {
            sprintId = sprintList.get(0).getId();
            for (JiraSprintResponse sprint : sprintList) {
                if ("active".equalsIgnoreCase(sprint.getState())) {
                    sprintId = sprint.getId();
                    break;
                }
            }
        } else {
            boolean find = false;
            for (JiraSprintResponse sprint : sprintList) {
                if (sprintId.equals(sprint.getId())) {
                    find = true;
                    break;
                }
            }

            if (!find) throw new NotFoundException(SPRINT_ID_NOT_FOUND);
        }

        ProjectResponse response = projectServiceClient.getProject(auths, projectId);
        String projectKey = response.getJiraProject();

        TokenResponse jira = authServiceClient.getToken(auths, "jira");
        String jiraBase64 = "Basic " + Base64Utils.encodeToString((jira.getEmail() + ":" + jira.getValue()).getBytes());


        String query = "project = " + projectKey + " AND assignee = currentUser() AND sprint = " + sprintId + " ORDER BY created DESC";
        JiraSearchIssueListResponse totalIssues = jiraFeignClient.getSearchIssues(jiraBase64, query);

        query = "project = " + projectKey + " AND assignee = currentUser() AND sprint = " + sprintId + " AND status = Done ORDER BY created DESC";
        JiraSearchIssueListResponse doneIssues = jiraFeignClient.getSearchIssues(jiraBase64, query);

        return JiraSprintProgressResponse.builder()
                .sprintList(sprintList)
                .sprintId(sprintId)
                .total(totalIssues.getTotal())
                .done(doneIssues.getTotal())
                .build();
    }
}
