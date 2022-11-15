package com.ssafy.dto.response.jira.issue;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class JiraIssueStatusResponse {
    @ApiModelProperty(value = "이슈 처리 상태 이름", notes = "'해야 할 일/진행 중/완료됨'의 형태로 나타납니다.")
    private String name;

    @ApiModelProperty(value = "이슈 처리 상태 id", notes = "해야 할 일은 10000/진행 중은 3/완료됨은 10001 으로 나타납니다.")
    private String id;

    @Builder
    public JiraIssueStatusResponse(String name, String id) {
        this.name = name;
        this.id = id;
    }
}
