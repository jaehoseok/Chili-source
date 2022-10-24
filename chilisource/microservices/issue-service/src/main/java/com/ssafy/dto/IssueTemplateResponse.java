package com.ssafy.dto;

import lombok.*;

@Getter
@NoArgsConstructor
public class IssueTemplateResponse {
    Long issueTemplateId;
    Long issueTypeId;
    String summary;
    String description;
    String assignee;
    String priority;
    String epicLink;
    Long sprint;
    Double storyPoints;

    @Builder
    public IssueTemplateResponse(Long issueTemplateId, Long issueTypeId, String summary, String description, String assignee, String priority, String epicLink, Long sprint, Double storyPoints) {
        this.issueTemplateId = issueTemplateId;
        this.issueTypeId = issueTypeId;
        this.summary = summary;
        this.description = description;
        this.assignee = assignee;
        this.priority = priority;
        this.epicLink = epicLink;
        this.sprint = sprint;
        this.storyPoints = storyPoints;
    }
}
