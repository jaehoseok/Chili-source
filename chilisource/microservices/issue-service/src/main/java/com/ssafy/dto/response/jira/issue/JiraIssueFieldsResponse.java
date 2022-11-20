package com.ssafy.dto.response.jira.issue;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@ApiModel(value = "그 외 이슈에 대한 정보 가지고 있는 객체")
public class JiraIssueFieldsResponse {
    @ApiModelProperty(value = "이슈 타입")
    private JiraIssueTypeResponse issuetype;

    @ApiModelProperty(value = "에픽 링크")
    private JiraIssueParentResponse parent;

    @ApiModelProperty(value = "프로젝트")
    private JiraIssueProjectResponse project;

    @ApiModelProperty(value = "우선순위")
    private JiraIssuePriorityResponse priority;

    @ApiModelProperty(value = "담당자")
    private JiraIssueAssigneeResponse assignee;

    @ApiModelProperty(value = "이슈 처리 상태")
    private JiraIssueStatusResponse status;

    @ApiModelProperty(value = "이슈에 대한 간략한 설명")
    private JiraIssueSummaryResponse summary;

    @ApiModelProperty(value = "보고자")
    private JiraIssueReporterResponse reporter;

    @ApiModelProperty(value = "스프린트")
    private List<JiraIssueSprintResponse> customfield_10020;

    @ApiModelProperty(value = "스토리 포인트")
    private Double customfield_10031;

    @Builder
    public JiraIssueFieldsResponse(JiraIssueTypeResponse issuetype, JiraIssueParentResponse parent, JiraIssueProjectResponse project, JiraIssuePriorityResponse priority, JiraIssueAssigneeResponse assignee, JiraIssueStatusResponse status, JiraIssueSummaryResponse summary, JiraIssueReporterResponse reporter, List<JiraIssueSprintResponse> customfield_10020, Double customfield_10031) {
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
