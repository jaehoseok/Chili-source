package com.ssafy.dto.response.jira.sprint;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@ApiModel(value = "현 프로젝트의 스프린트 목록")
public class JiraSprintListResponse {
    private List<JiraSprintResponse> values;

    @Builder
    public JiraSprintListResponse(List<JiraSprintResponse> values) {
        this.values = values;
    }
}
