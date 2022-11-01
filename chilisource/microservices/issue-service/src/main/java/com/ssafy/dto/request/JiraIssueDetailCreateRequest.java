package com.ssafy.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueDetailCreateRequest {
    private String summary;
    private JiraIssueParentRequest parent;
    private JiraIssueTypeRequest issueType;
    private JiraIssueProjectRequest project;
    private JiraIssueDescriptionRequest description;
    private JiraIssueReporterRequest reporter;
    private JiraIssueAssigneeRequest assignee;
    private JiraIssuePriorityRequest priority;

    @Builder
    public JiraIssueDetailCreateRequest(String summary, JiraIssueParentRequest parent, JiraIssueTypeRequest issueType, JiraIssueProjectRequest project, JiraIssueDescriptionRequest description, JiraIssueReporterRequest reporter, JiraIssueAssigneeRequest assignee, JiraIssuePriorityRequest priority) {
        this.summary = summary;
        this.parent = parent;
        this.issueType = issueType;
        this.project = project;
        this.description = description;
        this.reporter = reporter;
        this.assignee = assignee;
        this.priority = priority;
    }
}
