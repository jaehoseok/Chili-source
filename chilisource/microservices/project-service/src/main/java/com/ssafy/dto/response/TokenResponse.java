package com.ssafy.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
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
