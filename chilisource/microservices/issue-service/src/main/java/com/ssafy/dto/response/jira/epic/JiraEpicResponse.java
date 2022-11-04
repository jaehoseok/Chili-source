package com.ssafy.dto.response.jira.epic;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "에픽 객체")
public class JiraEpicResponse {
    @ApiModelProperty(value = "에픽의 key")
    private String key;

    @ApiModelProperty(value = "에픽의 내용")
    private FieldResponse fields;

    @Builder
    public JiraEpicResponse(String key, FieldResponse fields) {
        this.key = key;
        this.fields = fields;
    }
}
