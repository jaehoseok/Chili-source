package com.ssafy.dto.response.jira.epic;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "에픽의 내용")
public class FieldResponse {
    @ApiModelProperty(value = "에픽의 내용")
    private String summary;

    @Builder
    public FieldResponse(String summary) {
        this.summary = summary;
    }
}
