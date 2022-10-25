package com.ssafy.service;

import com.ssafy.client.ProjectServiceClient;
import com.ssafy.dto.*;
import com.ssafy.entity.IssueTemplate;
import com.ssafy.entity.IssueType;
import com.ssafy.entity.MiddleBucket;
import com.ssafy.exception.NotFoundException;
import com.ssafy.repository.IssueTemplateRepo;
import com.ssafy.repository.IssueTypeRepo;
import com.ssafy.repository.MiddleBucketRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.exception.NotFoundException.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class IssueServiceImpl implements IssueService {
    private final IssueTemplateRepo issueTemplateRepo;
    private final IssueTypeRepo issueTypeRepo;
    private final MiddleBucketRepo middleBucketRepo;
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
                        .issueTypeId(issueTemplate.getIssueType().getId())
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

    @Override
    public void createIssueTemplate(Long userId, IssueTemplateCreateRequest issueTemplateCreateRequest) {
        if (!projectServiceClient.findProjectById(issueTemplateCreateRequest.getProjectId())) {
            throw new NotFoundException(PROJECT_NOT_FOUND);
        }
        IssueType issueType = issueTypeRepo.findById(issueTemplateCreateRequest.getIssueTypeId())
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

    @Override
    public void updateIssueTemplate(Long userId, Long issueTemplateId, IssueTemplateUpdateRequest issueTemplateUpdateRequest) {

    }

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
    public List<MiddleBucketListResponse> getMiddleBucket(Long userId, Long middleBucketId) {
        MiddleBucket middleBucket = middleBucketRepo.findById(middleBucketId)
                .orElseThrow(() -> new NotFoundException(MIDDLE_BUCKET_NOT_FOUND));
        // TODO 여기까지
        return null;
    }
}
