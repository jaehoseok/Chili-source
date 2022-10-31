package com.ssafy.service;

import com.ssafy.client.JiraFeignClient;
import com.ssafy.client.ProjectServiceClient;
import com.ssafy.dto.*;
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
    public void addIssuesToJira(Long userId, Long projectId, Long middleBucketId) {


        jiraFeignClient.addIssuesToJira();
    }
}
