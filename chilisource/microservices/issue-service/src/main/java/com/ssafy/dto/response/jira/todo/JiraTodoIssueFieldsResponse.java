package com.ssafy.dto.response.jira.todo;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraTodoIssueFieldsResponse {
    private JiraTodoIssueTypeResponse issuetype;

    private JiraTodoIssueParentResponse parent;

    private JiraTodoIssueProjectResponse project;

    private JiraTodoIssuePriorityResponse priority;

    private JiraTodoIssueAssigneeResponse assignee;

    private JiraTodoIssueStatusResponse status;

    private JiraTodoIssueSummaryResponse summary;

    private JiraTodoIssueReporterResponse reporter;

//    private JiraTodoIssueSprintResponse customfield_10020; // 스프린트

    @Builder
    public JiraTodoIssueFieldsResponse(JiraTodoIssueTypeResponse issuetype, JiraTodoIssueParentResponse parent, JiraTodoIssueProjectResponse project, JiraTodoIssuePriorityResponse priority, JiraTodoIssueAssigneeResponse assignee, JiraTodoIssueStatusResponse status, JiraTodoIssueSummaryResponse summary, JiraTodoIssueReporterResponse reporter) {
        this.issuetype = issuetype;
        this.parent = parent;
        this.project = project;
        this.priority = priority;
        this.assignee = assignee;
        this.status = status;
        this.summary = summary;
        this.reporter = reporter;
    }
}
