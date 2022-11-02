package com.ssafy.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "프로젝트 정보", description = "설명")
public class ProjectCreateRequest {
    @ApiModelProperty(value = "프로젝트 이름")
    private String name;

    @ApiModelProperty(value = "프로젝트 설명")
    private String description;

    @Builder
    public ProjectCreateRequest(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
