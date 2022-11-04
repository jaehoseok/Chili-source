package com.ssafy.dto.response.jira.todo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "이슈 타입")
public class JiraTodoIssueTypeResponse {
    @ApiModelProperty(value = "이슈 타입 id")
    private String id;

    @Builder
    public JiraTodoIssueTypeResponse(String id) {
        this.id = id;
    }
}
