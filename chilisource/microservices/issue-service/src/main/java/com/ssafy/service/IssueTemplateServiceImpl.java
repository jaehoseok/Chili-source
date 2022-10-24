package com.ssafy.service;

import com.ssafy.client.ProjectServiceClient;
import com.ssafy.dto.IssueTemplateCreateRequest;
import com.ssafy.dto.IssueTemplateResponse;
import com.ssafy.entity.IssueTemplate;
import com.ssafy.entity.IssueType;
import com.ssafy.exception.NotFoundException;
import com.ssafy.repository.IssueTemplateRepo;
import com.ssafy.repository.IssueTypeRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.exception.NotFoundException.ISSUE_TYPE_NOT_FOUND;
import static com.ssafy.exception.NotFoundException.PROJECT_NOT_FOUND;

@Slf4j
@RequiredArgsConstructor
@Service
public class IssueTemplateServiceImpl implements IssueTemplateService{
    private final IssueTemplateRepo issueTemplateRepo;
    private final IssueTypeRepo issueTypeRepo;
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
}
