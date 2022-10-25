package com.ssafy.service;

import com.ssafy.client.ProjectServiceClient;
import com.ssafy.dto.*;
import com.ssafy.entity.IssueTemplate;
import com.ssafy.entity.IssueType;
import com.ssafy.entity.MiddleBucket;
import com.ssafy.entity.MiddleBucketIssue;
import com.ssafy.exception.NotFoundException;
import com.ssafy.repository.IssueTemplateRepo;
import com.ssafy.repository.IssueTypeRepo;
import com.ssafy.repository.MiddleBucketIssueRepo;
import com.ssafy.repository.MiddleBucketRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.exception.NotFoundException.*;

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

    @Override
    public List<IssueTemplateResponse> getIssueTemplates(Long userId, Long projectId, Boolean me) {
        if (!projectServiceClient.findProjectById(projectId)) {
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
    public void createIssueTemplate(Long userId, IssueTemplateCreateRequest issueTemplateCreateRequest) {
        if (!projectServiceClient.findProjectById(issueTemplateCreateRequest.getProjectId())) {
            throw new NotFoundException(PROJECT_NOT_FOUND);
        }
        IssueType issueType = issueTypeRepo.findByName(issueTemplateCreateRequest.getIssueType())
                .orElseThrow(() -> new NotFoundException(ISSUE_TYPE_NOT_FOUND));

        IssueTemplate issueTemplate = IssueTemplate.builder()
                .summary(issueTemplateCreateRequest.getSummary())
                .description(issueTemplateCreateRequest.getDescription())
                .assignee(issueTemplateCreateRequest.getAssignee())
                .priority(issueTemplateCreateRequest.getPriority())
                .epicLink(issueTemplateCreateRequest.getEpicLink())
                .sprint(issueTemplateCreateRequest.getSprint())
                .storyPoints(issueTemplateCreateRequest.getStoryPoints())
                .issueType(issueType)
                .userId(userId)
                .projectId(issueTemplateCreateRequest.getProjectId())
                .build();
        issueTemplateRepo.save(issueTemplate);
    }

    @Transactional
    @Override
    public void updateIssueTemplate(Long userId, Long issueTemplateId, IssueTemplateUpdateRequest issueTemplateUpdateRequest) {
        IssueTemplate issueTemplate = issueTemplateRepo.findById(issueTemplateId)
                .orElseThrow(() -> new NotFoundException(ISSUE_TEMPLATE_NOT_FOUND));
        IssueType issueType = issueTypeRepo.findByName(issueTemplateUpdateRequest.getIssueType())
                .orElseThrow(() -> new NotFoundException(ISSUE_TYPE_NOT_FOUND));

        issueTemplate.update(
                issueTemplateUpdateRequest.getSummary(),
                issueTemplateUpdateRequest.getDescription(),
                issueTemplateUpdateRequest.getAssignee(),
                issueTemplateUpdateRequest.getPriority(),
                issueTemplateUpdateRequest.getEpicLink(),
                issueTemplateUpdateRequest.getSprint(),
                issueTemplateUpdateRequest.getStoryPoints(),
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
        if (!projectServiceClient.findProjectById(projectId)) {
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
    public void createMiddleBucket(Long userId, MiddleBucketCreateRequest middleBucketCreateRequest) {
        Long projectId = middleBucketCreateRequest.getProjectId();
        if (!projectServiceClient.findProjectById(projectId)) {
            throw new NotFoundException(PROJECT_NOT_FOUND);
        }

        MiddleBucket middleBucket = MiddleBucket.builder()
                .name(middleBucketCreateRequest.getName())
                .userId(userId)
                .projectId(projectId)
                .build();

        middleBucketRepo.save(middleBucket);
    }

    @Transactional
    @Override
    public void updateMiddleBucket(Long userId, Long middleBucketId, MiddleBucketUpdateRequest middleBucketUpdateRequest) {
        MiddleBucket middleBucket = middleBucketRepo.findById(middleBucketId)
                .orElseThrow(() -> new NotFoundException(MIDDLE_BUCKET_NOT_FOUND));
        middleBucket.update(middleBucketUpdateRequest.getName());
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
    public void addIssueIntoMiddleBucket(Long userId, Long middleBucketId, MiddleBucketIssueCreateRequest middleBucketIssueCreateRequest) {
        MiddleBucket middleBucket = middleBucketRepo.findById(middleBucketId)
                .orElseThrow(() -> new NotFoundException(MIDDLE_BUCKET_NOT_FOUND));
        IssueType issueType = issueTypeRepo.findByName(middleBucketIssueCreateRequest.getIssueType())
                .orElseThrow(() -> new NotFoundException(ISSUE_TYPE_NOT_FOUND));

        MiddleBucketIssue middleBucketIssue = MiddleBucketIssue.builder()
                .summary(middleBucketIssueCreateRequest.getSummary())
                .description(middleBucketIssueCreateRequest.getDescription())
                .assignee(middleBucketIssueCreateRequest.getAssignee())
                .priority(middleBucketIssueCreateRequest.getPriority())
                .epicLink(middleBucketIssueCreateRequest.getEpicLink())
                .sprint(middleBucketIssueCreateRequest.getSprint())
                .storyPoints(middleBucketIssueCreateRequest.getStoryPoints())
                .middleBucket(middleBucket)
                .issueType(issueType)
                .build();
        middleBucketIssueRepo.save(middleBucketIssue);

        middleBucket.addIssue(middleBucketIssue);
    }
}
