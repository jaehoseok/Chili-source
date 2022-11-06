package com.ssafy.dto.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TokenCreateRequest {
    @ApiModelProperty(value = "토큰 값")
    private String value;

    @ApiModelProperty(value = "토큰 코드 pk")
    private String tokenCodeId;

    @ApiModelProperty(value = "Jira에서 필요한 eamil")
    private String email;

    @Builder
    public TokenCreateRequest(String value, String tokenCodeId, String email) {
        this.value = value;
        this.tokenCodeId = tokenCodeId;
        this.email = email;
    }
}
