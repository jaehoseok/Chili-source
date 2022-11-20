package com.ssafy.dto.response.jira.issue;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@ApiModel(value = "JIRA에서 JQL 검색 결과 이슈 리스트")
public class JiraSearchIssueListResponse {
    @ApiModelProperty(value = "검색된 이슈 수")
    private Integer total;

    @ApiModelProperty(value = "이슈 리스트를 가지고 있는 객체")
    private List<JiraIssueResponse> issues;

    @Builder
    public JiraSearchIssueListResponse(Integer total, List<JiraIssueResponse> issues) {
        this.total = total;
        this.issues = issues;
    }
}
