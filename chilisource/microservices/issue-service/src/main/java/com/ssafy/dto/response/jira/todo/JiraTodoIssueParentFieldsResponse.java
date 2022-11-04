package com.ssafy.dto.response.jira.todo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "에픽 링크 이름")
public class JiraTodoIssueParentFieldsResponse {
    @ApiModelProperty(value = "에픽 링크 이름")
    private String summary;

    @Builder
    public JiraTodoIssueParentFieldsResponse(String summary) {
        this.summary = summary;
    }
}
