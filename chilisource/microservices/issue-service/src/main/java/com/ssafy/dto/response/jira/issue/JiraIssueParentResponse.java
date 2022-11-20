package com.ssafy.dto.response.jira.issue;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "에픽 링크")
public class JiraIssueParentResponse {
    @ApiModelProperty(value = "에픽 링크 id")
    private String id;

    @ApiModelProperty(value = "에픽 링크 key")
    private String key;

    @ApiModelProperty(value = "에픽 링크 이름")
    private JiraIssueParentFieldsResponse fields;

    @Builder
    public JiraIssueParentResponse(String id, String key, JiraIssueParentFieldsResponse fields) {
        this.id = id;
        this.key = key;
        this.fields = fields;
    }
}
