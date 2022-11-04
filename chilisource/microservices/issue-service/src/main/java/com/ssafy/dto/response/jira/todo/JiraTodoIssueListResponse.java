package com.ssafy.dto.response.jira.todo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@ApiModel(value = "JIRA에서 아직 done하지 않은 이슈 리스트")
public class JiraTodoIssueListResponse {
    @ApiModelProperty(value = "이슈 리스트를 가지고 있는 객체")
    private List<JiraTodoIssueResponse> issues;

    @Builder
    public JiraTodoIssueListResponse(List<JiraTodoIssueResponse> issues) {
        this.issues = issues;
    }
}
