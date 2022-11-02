package com.ssafy.dto.response;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserResponse {
    @ApiModelProperty(value = "유저 pk")
    private Long id;

    @ApiModelProperty(value = "유저 이름")
    private String name;

    @ApiModelProperty(value = "유저 이미지")
    private String image;

    @Builder
    public UserResponse(Long id, String name, String image) {
        this.id = id;
        this.name = name;
        this.image = image;
    }
}
