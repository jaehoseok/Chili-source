package com.ssafy.dto.request.jira.bulk;

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

    @ApiModelProperty(hidden = true)
    private Double customfield_10031; // 스토리 포인트

    @ApiModelProperty(hidden = true)
    private Long customfield_10020; // 스프린트

    @Builder
    public JiraIssueDetailCreateRequest(String summary, JiraIssueParentCreateRequest parent, JiraIssueTypeCreateRequest issuetype, JiraIssueProjectCreateRequest project, JiraIssueDescriptionCreateRequest description, JiraIssueReporterCreateRequest reporter, JiraIssueAssigneeCreateRequest assignee, JiraIssuePriorityCreateRequest priority,
                                        Double customfield_10031, Long customfield_10020) {
        this.summary = summary;
        this.parent = parent;
        this.issuetype = issuetype;
        this.project = project;
        this.description = description;
        this.reporter = reporter;
        this.assignee = assignee;
        this.priority = priority;
        this.customfield_10031 = customfield_10031;
        this.customfield_10020 = customfield_10020;
    }
}
