package com.ssafy.dto.response.jira.epic;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@ApiModel(value = "JIRA 에픽 리스트")
public class JiraEpicListResponse {
    @ApiModelProperty(value = "에픽 객체")
    private List<JiraEpicResponse> issues;

    @Builder
    public JiraEpicListResponse(List<JiraEpicResponse> issues) {
        this.issues = issues;
    }
}
