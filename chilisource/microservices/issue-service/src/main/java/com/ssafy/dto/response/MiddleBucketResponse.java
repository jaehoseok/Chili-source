package com.ssafy.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "미들버킷 정보")
public class MiddleBucketResponse {
    @ApiModelProperty(value = "미들버킷 id")
    private Long middleBucketId;

    @ApiModelProperty(value = "미들버킷 이름")
    private String name;

    @Builder
    public MiddleBucketResponse(Long middleBucketId, String name) {
        this.middleBucketId = middleBucketId;
        this.name = name;
    }
}
