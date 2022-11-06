package com.ssafy.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "생성하려는 미들 버킷")
public class MiddleBucketCreateRequest {
    @ApiModelProperty(value = "이름")
    private String name;

    @ApiModelProperty(value = "프로젝트 id")
    private Long projectId;
}
