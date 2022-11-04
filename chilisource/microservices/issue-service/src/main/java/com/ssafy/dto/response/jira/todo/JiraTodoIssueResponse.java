package com.ssafy.dto.response.jira.todo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "이슈 리스트를 가지고 있는 객체")
public class JiraTodoIssueResponse {
    @ApiModelProperty(value = "이슈의 id")
    private String id;

    @ApiModelProperty(value = "이슈의 key")
    private String key;

    // 이슈 타입과 에픽 링크
    @ApiModelProperty(value = "그 외 이슈에 대한 정보 가지고 있는 객체")
    private JiraTodoIssueFieldsResponse fields;

    @Builder
    public JiraTodoIssueResponse(String id, String key, JiraTodoIssueFieldsResponse fields) {
        this.id = id;
        this.key = key;
        this.fields = fields;
    }
}
