package com.ssafy.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class IssueTemplateResponse {
    private Long issueTemplateId;

    private String issueType;

    private String summary;

    private String description;

    private String assignee;

    private String priority;

    private String epicLink;

    private Long sprint;

    private Double storyPoints;

    @Builder
    public IssueTemplateResponse(Long issueTemplateId, String issueType, String summary, String description, String assignee, String priority, String epicLink, Long sprint, Double storyPoints) {
        this.issueTemplateId = issueTemplateId;
        this.issueType = issueType;
        this.summary = summary;
        this.description = description;
        this.assignee = assignee;
        this.priority = priority;
        this.epicLink = epicLink;
        this.sprint = sprint;
        this.storyPoints = storyPoints;
    }
}
