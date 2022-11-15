package com.ssafy.dto.response.jira.issue;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "이슈 리스트를 가지고 있는 객체")
public class JiraIssueResponse {
    @ApiModelProperty(value = "이슈의 id")
    private String id;

    @ApiModelProperty(value = "이슈의 key")
    private String key;

    // 이슈 타입과 에픽 링크
    @ApiModelProperty(value = "그 외 이슈에 대한 정보 가지고 있는 객체")
    private JiraIssueFieldsResponse fields;

    @Builder
    public JiraIssueResponse(String id, String key, JiraIssueFieldsResponse fields) {
        this.id = id;
        this.key = key;
        this.fields = fields;
    }
}
