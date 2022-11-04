package com.ssafy.dto.response.jira.todo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "에픽 링크")
public class JiraTodoIssueParentResponse {
    @ApiModelProperty(value = "에픽 링크 id")
    private String id;

    @ApiModelProperty(value = "에픽 링크 key")
    private String key;

    @ApiModelProperty(value = "에픽 링크 이름")
    private JiraTodoIssueParentFieldsResponse fields;

    @Builder
    public JiraTodoIssueParentResponse(String id, String key, JiraTodoIssueParentFieldsResponse fields) {
        this.id = id;
        this.key = key;
        this.fields = fields;
    }
}
