package com.ssafy.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "프로젝트 정보", description = "설명")
public class ProjectUpdateRequest {
    @ApiModelProperty(value = "프로젝트 pk")
    private Long id;

    @ApiModelProperty(value = "프로젝트 이름")
    private String name;

    @ApiModelProperty(value = "프로젝트 설명")
    private String description;

    @Builder
    public ProjectUpdateRequest(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}
