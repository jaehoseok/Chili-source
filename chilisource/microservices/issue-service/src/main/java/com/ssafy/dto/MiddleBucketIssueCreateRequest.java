package com.ssafy.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MiddleBucketIssueCreateRequest {
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
