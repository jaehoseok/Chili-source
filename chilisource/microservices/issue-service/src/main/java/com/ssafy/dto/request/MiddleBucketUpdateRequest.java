package com.ssafy.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "수정하려는 미들 버킷")
public class MiddleBucketUpdateRequest {
    @ApiModelProperty(value = "수정할 이름")
    private String name;
}
