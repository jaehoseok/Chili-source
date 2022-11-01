package com.ssafy.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TokenResponse {
    private Long id;

    private Long tokenCodeId;

    private String value;

    private String email;

    private String jiraUserId;

    @Builder
    public TokenResponse(Long id, Long tokenCodeId, String value, String email, String jiraUserId) {
        this.id = id;
        this.tokenCodeId = tokenCodeId;
        this.value = value;
        this.email = email;
        this.jiraUserId = jiraUserId;
    }
}
