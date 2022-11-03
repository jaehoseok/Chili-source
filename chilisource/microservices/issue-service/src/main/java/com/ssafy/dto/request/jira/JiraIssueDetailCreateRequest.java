package com.ssafy.dto.request.jira;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueDetailCreateRequest {
    private String summary;

    private JiraIssueParentCreateRequest parent;

    private JiraIssueTypeCreateRequest issuetype;

    private JiraIssueProjectCreateRequest project;

    private JiraIssueDescriptionCreateRequest description;

    private JiraIssueReporterCreateRequest reporter;

    private JiraIssueAssigneeCreateRequest assignee;

    private JiraIssuePriorityCreateRequest priority;

    @Builder
    public JiraIssueDetailCreateRequest(String summary, JiraIssueParentCreateRequest parent, JiraIssueTypeCreateRequest issuetype, JiraIssueProjectCreateRequest project, JiraIssueDescriptionCreateRequest description, JiraIssueReporterCreateRequest reporter, JiraIssueAssigneeCreateRequest assignee, JiraIssuePriorityCreateRequest priority) {
        this.summary = summary;
        this.parent = parent;
        this.issuetype = issuetype;
        this.project = project;
        this.description = description;
        this.reporter = reporter;
        this.assignee = assignee;
        this.priority = priority;
    }
}
