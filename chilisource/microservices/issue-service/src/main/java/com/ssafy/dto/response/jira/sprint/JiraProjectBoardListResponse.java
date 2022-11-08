package com.ssafy.dto.response.jira.sprint;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@ApiModel(value = "현 프로젝트의 보드id 리스트")
public class JiraProjectBoardListResponse {
    private List<JiraProjectBoardResponse> values;

    @Builder
    public JiraProjectBoardListResponse(List<JiraProjectBoardResponse> values) {
        this.values = values;
    }
}
