package com.ssafy.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class IssueResponse {
    private Long issueId;

    private String issueType;

    private String summary;

    private String description;

    private String assignee;

    private String priority;

    private String epicLink;

    private Long sprint;

    private Double storyPoints;

    @Builder
    public IssueResponse(Long issueId, String issueType, String summary, String description, String assignee, String priority, String epicLink, Long sprint, Double storyPoints) {
        this.issueId = issueId;
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
