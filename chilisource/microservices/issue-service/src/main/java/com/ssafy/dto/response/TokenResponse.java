package com.ssafy.dto.response;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@Getter
@NoArgsConstructor
@ApiIgnore
public class TokenResponse {
    private Long id;

    private String value;

    private String email;

    private String jiraAccountId;

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
