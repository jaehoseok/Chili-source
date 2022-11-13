package com.ssafy.dto.response.jira.todo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

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

    @ApiModelProperty(value = "스프린트")
    private List<JiraTodoIssueSprintResponse> customfield_10020;

    @ApiModelProperty(value = "스토리 포인트")
    private Double customfield_10031;

    @Builder
    public JiraTodoIssueFieldsResponse(JiraTodoIssueTypeResponse issuetype, JiraTodoIssueParentResponse parent, JiraTodoIssueProjectResponse project, JiraTodoIssuePriorityResponse priority, JiraTodoIssueAssigneeResponse assignee, JiraTodoIssueStatusResponse status, JiraTodoIssueSummaryResponse summary, JiraTodoIssueReporterResponse reporter, List<JiraTodoIssueSprintResponse> customfield_10020, Double customfield_10031) {
        this.issuetype = issuetype;
        this.parent = parent;
        this.project = project;
        this.priority = priority;
        this.assignee = assignee;
        this.status = status;
        this.summary = summary;
        this.reporter = reporter;
        this.customfield_10020 = customfield_10020;
        this.customfield_10031 = customfield_10031;
    }
}
