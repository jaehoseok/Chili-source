package com.ssafy.dto.response.jira.todo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "그 외 이슈에 대한 정보 가지고 있는 객체")
public class JiraTodoIssueFieldsResponse {
    @ApiModelProperty(value = "이슈 타입")
    private JiraTodoIssueTypeResponse issuetype;

    @ApiModelProperty(value = "에픽 링크")
    private JiraTodoIssueParentResponse parent;

    @ApiModelProperty(value = "프로젝트")
    private JiraTodoIssueProjectResponse project;

    @ApiModelProperty(value = "우선순위")
    private JiraTodoIssuePriorityResponse priority;

    @ApiModelProperty(value = "담당자")
    private JiraTodoIssueAssigneeResponse assignee;

    @ApiModelProperty(value = "이슈 처리 상태")
    private JiraTodoIssueStatusResponse status;

    @ApiModelProperty(value = "이슈에 대한 간략한 설명")
    private JiraTodoIssueSummaryResponse summary;

    @ApiModelProperty(value = "보고자")
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
