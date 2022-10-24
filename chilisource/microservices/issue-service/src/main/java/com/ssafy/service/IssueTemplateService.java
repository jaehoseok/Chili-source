package com.ssafy.service;

import com.ssafy.dto.IssueTemplateResponse;
import com.ssafy.entity.IssueTemplate;
import com.ssafy.repository.IssueTemplateRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class IssueTemplateService {
    private final IssueTemplateRepo issueTemplateRepo;

    public List<IssueTemplateResponse> getIssueTemplates(Long userId, Long projectId, Boolean me) {
        List<IssueTemplate> responses = new ArrayList<>();
        // 분기를 먼저 작성
        // 프로젝트와 관련된 이슈 템플릿인지
        if (projectId != null && !me) {
            responses = issueTemplateRepo.findByProjectId(projectId);
        }
        // 나와 관련된 이슈 템플릿인지
        else if (projectId == null && me) {
            // 여기서 이제 userId 받아와야 해
            responses = issueTemplateRepo.findByUserId(userId);
        }
        // 프로젝트 && 나 인건지
        else if (projectId != null && me) {
            responses = issueTemplateRepo.findByProjectIdAndUserId(projectId, userId);
        }

        // 그리고 조건에 맞는 이슈 템플릿을 리포지토리에서 찾아서 리스폰스로 빌더한 후에 리턴
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
}
