package com.ssafy.dto.response.jira.todo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "이슈에 대한 간략한 설명")
public class JiraTodoIssueSummaryResponse {
    @ApiModelProperty(value = "이슈에 대한 간략한 설명")
    private String summary;

    @Builder
    public JiraTodoIssueSummaryResponse(String summary) {
        this.summary = summary;
    }
}
