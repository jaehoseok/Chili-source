package com.ssafy.dto.response;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TokenResponse {
    @ApiModelProperty(value = "토큰 pk")
    private Long id;

    @ApiModelProperty(value = "토큰 값")
    private String value;

    @ApiModelProperty(value = "Jira에서 필요한 email")
    private String email;

    @ApiModelProperty(value = "Jira이슈 등록시 필요한 Account ID")
    private String jiraAccountId;

    @ApiModelProperty(value = "토큰 코드 pk")
    private String tokenCodeId;

    @Builder
    public TokenResponse(Long id, String value, String email, String jiraAccountId, String tokenCodeId) {
        this.id = id;
        this.value = value;
        this.email = email;
        this.jiraAccountId = jiraAccountId;
        this.tokenCodeId = tokenCodeId;
    }
}
