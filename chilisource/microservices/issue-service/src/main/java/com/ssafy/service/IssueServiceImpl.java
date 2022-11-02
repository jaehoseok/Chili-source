package com.ssafy.service;

import com.ssafy.client.AuthServiceClient;
import com.ssafy.client.JiraFeignClient;
import com.ssafy.client.ProjectServiceClient;
import com.ssafy.config.loginuser.User;
import com.ssafy.dto.request.*;
import com.ssafy.dto.request.jira.JiraIssueBulkCreateRequest;
import com.ssafy.dto.request.jira.JiraIssueCreateRequest;
import com.ssafy.dto.request.jira.JiraIssueDetailCreateRequest;
import com.ssafy.dto.request.jira.JiraIssueProjectCreateRequest;
import com.ssafy.dto.response.*;
import com.ssafy.entity.IssueTemplate;
import com.ssafy.entity.IssueType;
import com.ssafy.entity.MiddleBucket;
import com.ssafy.entity.MiddleBucketIssue;
import com.ssafy.exception.DuplicateException;
import com.ssafy.exception.NotFoundException;
import com.ssafy.exception.WrongFormException;
import com.ssafy.repository.IssueTemplateRepo;
import com.ssafy.repository.IssueTypeRepo;
import com.ssafy.repository.MiddleBucketIssueRepo;
import com.ssafy.repository.MiddleBucketRepo;
import feign.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Base64;
import java.util.Base64.Encoder;
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

    private static Encoder encoder = Base64.getEncoder();

    @Override
    public List<IssueTemplateResponse> getIssueTemplates(Long userId, Long projectId, Boolean me) {
        Response response = projectServiceClient.findProjectById(projectId);
        if (HttpStatus.Series.valueOf(response.status()) != HttpStatus.Series.SUCCESSFUL) {
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
    public void createIssueTemplate(Long userId, IssueTemplateCreateRequest request) {
        Response response = projectServiceClient.findProjectById(request.getProjectId());
        if (HttpStatus.Series.valueOf(response.status()) != HttpStatus.Series.SUCCESSFUL) {
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
    public List<MiddleBucketResponse> getMiddleBuckets(Long userId, Long projectId, Boolean me) {
        Response response = projectServiceClient.findProjectById(projectId);
        if (HttpStatus.Series.valueOf(response.status()) != HttpStatus.Series.SUCCESSFUL) {
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
    public void createMiddleBucket(Long userId, MiddleBucketCreateRequest request) {
        Long projectId = request.getProjectId();
        Response response = projectServiceClient.findProjectById(projectId);
        if (HttpStatus.Series.valueOf(response.status()) != HttpStatus.Series.SUCCESSFUL) {
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

        middleBucket.addIssue(middleBucketIssue);
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

        // 예외처리 ver.1 : delete 실행 못함
//        if (middleBucket.getMiddleBucketIssues().contains(middleBucketIssue)) {
//            throw new NotFoundException(ISSUE_NOT_FOUND_IN_MIDDLE_BUCKET);
//        }

        // 예외처리 ver.2 : delete 실행 함
        if (!middleBucketIssue.getMiddleBucket().equals(middleBucket)) {
            throw new NotFoundException(ISSUE_NOT_FOUND_IN_MIDDLE_BUCKET);
        }

        middleBucketIssueRepo.deleteById(middleBucketIssueId); // (1)
//        System.out.println("완료"); // (2)

        // ver 1 실행시 (1)을 실행하지 않고 (2)만 실행됨
        // ver 2 실행시 (2)를 실행하고 (1)을 나중에 실행함

        // 의문점 1. 왜 ver 1은 (1)을 실행하지 않는지
        // 의문점 2. 왜 ver 2는 (2)를 선실행후 (1)을 나중에 실행하는지
    }

    @Override
    public void addIssuesToJira(User user, Long projectId, Long middleBucketId) {
        // token feign 으로 사용자 이메일, 사용자 지라 토큰, 사용자 고유 아이디 받아온다
        TokenResponse token = authServiceClient.getToken(user, "jira");
        String userEmail = token.getEmail();
        String userToken = token.getValue();
        String userJiraId = "62beec7c268cac6e31c5e160"; // 임시

        // project-feign 으로 지라 프로젝트 코드를 가져온다.
        String jiraProjectCode = projectServiceClient.getProject(projectId)
                .getJiraProject();

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
                    .build();


            // 2. 이슈 타입
            // 에픽은 지라에서 직접 생성하고 여기서는 스토리, 태스크, 버그만 생성 가능
            String
//            String customfield_10011 = null;
            // 2-1. 에픽이라면 - 일단 솔직히 에픽은 지라에서 만들어서 오는 걸로 하자 ㅡㅡ
//           if (issue.getIssueType().getName().equalsIgnoreCase("epic")) {
//
//            }
            issue.getEpicLink();
            // TODO 일단 에픽링크 보여주는 API를 만들어야겠네


            JiraIssueDetailCreateRequest fields = JiraIssueDetailCreateRequest.builder()
                    .summary(summary)
                    .project(project)
                    .issueType()
                    .parent()
                    .description()
                    .reporter()
                    .assignee()
                    .priority()
                    .build();

            JiraIssueCreateRequest build = JiraIssueCreateRequest.builder()
                    .fields(fields)
                    .build();

            issueUpdates.add(build);
        }
        // 각 이슈들을 지라 이슈로 create 할 수 있게 dto 형식을 만든다
        // 지라에 보낼 dto에 맞는 형식은..
        // 1. summary : 이건 우리 이슈에 담아놓은 summary 그대로 가져다 쓴다
        /*
        2. parent 얘가 문제임 -> null 로 해결해보자
        사용자가 만들려고 하는 이슈 타입이 에픽이면 parent는 필요없고 "customfield_100" 이라는 이름이 들어가야함
        사용자가 만들려고 하는 이슈 타입이 스토리, 버그, 태스크면 parent에 해당 에픽의 ID를 가져와야함
            -> 해당 어떻게 가져오지?
         */
        // 3. project는 id 이든 key 든 상관 없는데 이거는 project-service에서 feign으로 jira project code 가져오면 됨
        // 4. description은 사용자가 입력한 정보로 처리하면 됨
        // 5. reporter와 assignee는 내가 재호쪽으로 feign으로 요청해서 id 가져오면 됨
        // + 이때 이메일이랑 토큰을 같이 가져오게
        // 6. priority는 medium 이면 3으로 highest면 1로 이런 식으로 switch로 매핑...
        // 7. storyPoints 는 db에 있는 값
        // 8. 스프린트는 일단 바이이

        JiraIssueBulkCreateRequest request = JiraIssueBulkCreateRequest.builder()
                .issueUpdates(issueUpdates)
                .build();
        // 그걸 다시 list 형식으로 dto를 만든다 그걸 지라에 보낸다
//        jiraFeignClient.addIssuesToJira();
    }

    @Override
    public JiraEpicListResponse getEpicList(User user) {
//        // 사용자 아이디로 1. 사용자 이메일 2. 사용자 토큰 3. 사용자 지라 고유 아이디를 받아온다
        TokenResponse response = authServiceClient.getToken(user, "jira");

//        // 이메일과 토큰으로 Base64 인코딩을 한다
        String token = response.getEmail() + ":" + response.getValue();
        String jiraToken = Base64.getEncoder().encodeToString(token.getBytes());

        // feign을 요청해서 -> dto 로 받는다
        JiraEpicListResponse jiraEpics = jiraFeignClient.getJiraEpics("Basic " + jiraToken);

        // 리턴한다
        return jiraEpics;
    }
}
