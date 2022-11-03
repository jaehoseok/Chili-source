package com.ssafy.dto.response.jira;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraTodoIssueResponse {
    private String id;

    private String key;

    // 이슈 타입과 에픽 링크
    private JiraTodoIssueFieldsResponse fields;

    private JiraTodoIssueProjectResponse project;

    private JiraTodoIssuePriorityResponse priority;

    private JiraTodoIssueAssigneeResponse assignee;

    private JiraTodoIssueStatusResponse status;

    private JiraTodoIssueSummaryResponse summary;

    private JiraTodoIssueReporterResponse reporter;

//    private JiraTodoIssueSprintResponse customfield_10020; // 스프린트


    @Builder
    public JiraTodoIssueResponse(String id, String key, JiraTodoIssueFieldsResponse fields, JiraTodoIssueProjectResponse project, JiraTodoIssuePriorityResponse priority, JiraTodoIssueAssigneeResponse assignee, JiraTodoIssueStatusResponse status, JiraTodoIssueSummaryResponse summary, JiraTodoIssueReporterResponse reporter) {
        this.id = id;
        this.key = key;
        this.fields = fields;
        this.project = project;
        this.priority = priority;
        this.assignee = assignee;
        this.status = status;
        this.summary = summary;
        this.reporter = reporter;
    }
}
