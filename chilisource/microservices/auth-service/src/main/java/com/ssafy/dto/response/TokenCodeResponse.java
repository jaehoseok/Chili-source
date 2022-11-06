package com.ssafy.dto.response;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TokenCodeResponse {
    @ApiModelProperty(value = "토큰 코드 pk")
    private String id;

    @Builder
    public TokenCodeResponse(String id) {
        this.id = id;
    }
}
