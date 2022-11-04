package com.ssafy.dto.request.jira;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueDetailCreateRequest {
    @ApiModelProperty(hidden = true)
    private String summary;

    @ApiModelProperty(hidden = true)
    private JiraIssueParentCreateRequest parent;

    @ApiModelProperty(hidden = true)
    private JiraIssueTypeCreateRequest issuetype;

    @ApiModelProperty(hidden = true)
    private JiraIssueProjectCreateRequest project;

    @ApiModelProperty(hidden = true)
    private JiraIssueDescriptionCreateRequest description;

    @ApiModelProperty(hidden = true)
    private JiraIssueReporterCreateRequest reporter;

    @ApiModelProperty(hidden = true)
    private JiraIssueAssigneeCreateRequest assignee;

    @ApiModelProperty(hidden = true)
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
