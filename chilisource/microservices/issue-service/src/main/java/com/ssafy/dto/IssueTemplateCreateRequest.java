package com.ssafy.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class IssueTemplateCreateRequest {
    private Long issueTypeId;
    private String summary;
    private String description;
    private String assignee;
    private String priority;
    private String epicLink;
    private Long sprint;
    private Double storyPoints;
    private Long projectId;

    @Builder
    public IssueTemplateCreateRequest(Long issueTypeId, String summary, String description, String assignee, String priority, String epicLink, Long sprint, Double storyPoints, Long projectId) {
        this.issueTypeId = issueTypeId;
        this.summary = summary;
        this.description = description;
        this.assignee = assignee;
        this.priority = priority;
        this.epicLink = epicLink;
        this.sprint = sprint;
        this.storyPoints = storyPoints;
        this.projectId = projectId;
    }
}
