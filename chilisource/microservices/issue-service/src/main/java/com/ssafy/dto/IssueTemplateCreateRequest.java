package com.ssafy.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class IssueTemplateCreateRequest {
    private String issueType;
    private String summary;
    private String description;
    private String assignee;
    private String priority;
    private String epicLink;
    private Long sprint;
    private Double storyPoints;
    private Long projectId;
}
